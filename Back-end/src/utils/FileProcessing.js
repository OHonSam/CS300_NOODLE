// utils/fileProcessing.js
const XlsxPopulate = require('xlsx-populate');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const { Account } = require('../models/AccountModel');

class FileProcessingUtil {
  /**
   * Process uploaded file and extract user data
   * @param {Object} file - The uploaded file object
   * @returns {Promise<Array>} Array of user objects
   */
  static async processFile(file, requiredFields) {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    let userData = [];

    switch (fileExtension) {
      case 'xlsx':
        userData = await FileProcessingUtil.processExcel(file, requiredFields);
        break;
      case 'csv':
        userData = await FileProcessingUtil.processCsv(file, requiredFields);
        break;
      case 'txt':
        userData = await FileProcessingUtil.processTxt(file, requiredFields);
        break;
      default:
        throw new Error('Unsupported file format');
    }

    // remove the first row
    userData.shift();

    userData = userData.map((row) => {
      const parsedRow = { ...row };

      // Convert 'dob' field to a valid date if it exists
      if (parsedRow.dob) {
      const date = new Date(parsedRow.dob);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date format for dob: ${parsedRow.dob}`);
      }
      parsedRow.dob = date;
      }

      return parsedRow;
    });

    return userData;
  }

  static async processExcel(file, requiredFields) {
    if (!file || !file.buffer) {
      throw new Error('Excel file is empty or invalid');
    }
  
    try {
      const workbook = await XlsxPopulate.fromDataAsync(file.buffer);
      const sheet = workbook.sheet(0);
      const headers = sheet.row(1).cells().map(cell => cell.value());
      
      if (!headers || headers.length === 0) {
        throw new Error('Excel file is missing headers');
      }
  
      const data = [];
      const usedRange = sheet.usedRange();
      const rowCount = usedRange ? usedRange.endCell().rowNumber() : 0;
  
      for (let rowNum = 2; rowNum <= rowCount; rowNum++) {
        const rowData = {};
        sheet.row(rowNum).cells().forEach((cell, index) => {
          const header = headers[index];
          let value = cell.value();
  
          // Convert dates to ISO string if the value is a date
          if (value instanceof Date) {
            value = value.toISOString().split('T')[0];
          }
  
          rowData[header] = value;
        });
  
        // Check for missing required fields
        for (const field of requiredFields) {
          if (!rowData[field]) {
            throw new Error(`Missing required field "${field}" on row ${rowNum}: ${JSON.stringify(rowData)}`);
          }
        }
  
        if (Object.values(rowData).some(val => val != null)) {
          data.push(rowData);
        }
      }
  
      return data;
    } catch (error) {
      throw new Error(`Error processing Excel file: ${error.message}`);
    }
  }
  
  
  static async processCsv(file, requiredFields) {
    if (!file || !file.buffer || !file.buffer.toString().trim()) {
      throw new Error('CSV file is empty or invalid');
    }
  
    return new Promise((resolve, reject) => {
      const results = [];
      const csvData = file.buffer.toString();
  
      const parser = csv({
        mapValues: ({ header, value }) => {
          if (value.match(/^\d{4}-\d{2}-\d{2}$/) || value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            const date = new Date(value);
            if (!isNaN(date)) {
              return date.toISOString().split('T')[0];
            }
          }
          return value;
        },
      });
  
      parser.on('data', (data) => {
        try {
          // Check for missing required fields
          for (const field of requiredFields) {
            if (!data[field]) {
              throw new Error(`Missing required field "${field}" in row: ${JSON.stringify(data)}`);
            }
          }
          results.push(data);
        } catch (error) {
          parser.destroy(); // Stop further processing on error
          reject(error);
        }
      });
  
      parser.on('end', () => resolve(results));
      parser.on('error', (error) => reject(error));
  
      parser.write(csvData);
      parser.end();
    });
  }
  
  static async processTxt(file, requiredFields) {
    if (!file || !file.buffer || !file.buffer.toString().trim()) {
      throw new Error('TXT file is empty or invalid');
    }
  
    const txtData = file.buffer.toString().split('\n');
  
    return txtData
      .filter(line => line.trim()) // Remove empty lines
      .map((line, index) => {
        const fieldValues = line.split(',').map(item => item.trim());
        const fieldMap = {};
        requiredFields.forEach((field, index) => {
          fieldMap[field] = fieldValues[index];
        });
  
        // Check for missing required fields
        for (const field of requiredFields) {
          if (!fieldMap[field]) {
            throw new Error(`Missing required field "${field}" on line ${index + 1}: "${line}"`);
          }
        }
  
        return fieldMap;
      });
  }
  
  

  /**
   * Validate the file size and type
   * @param {Object} file - The uploaded file object
   * @param {number} maxSize - Maximum file size in bytes
   * @returns {Object} Validation result
   */
  static validateFile(file, maxSize = 5 * 1024 * 1024) { // Default 5MB
    const allowedTypes = ['xlsx', 'csv', 'txt'];
    const fileExtension = file.originalname.split('.').pop().toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      throw new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
    }

    if (file.size > maxSize) {
      throw new Error(`File size exceeds limit of ${maxSize / (1024 * 1024)}MB`);
    }

    return true;
  }
}

class BulkUserCreationUtil {
  /**
   * Create multiple users and their associated accounts
   * @param {Array} userData - Array of user data objects
   * @param {Object} options - Configuration options
   * @param {mongoose.Model} options.UserModel - Mongoose model for the user type
   * @param {string} options.roleId - Role ID for the account type
   * @param {string} options.userIdField - Field name for user ID (e.g., 'adminId', 'teacherId', 'studentId')
   * @returns {Promise<Object>} Result object with created users and accounts
   */
  static async createUsers(userData, { UserModel, roleId, userIdField }) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const createdUsers = [];
      const createdAccounts = [];

      for (const user of userData) {
        // Map the generic userId to the specific field name
        const mappedUser = {
          ...user,
          [userIdField]: user.userId || user[userIdField]
        };

        // Create account
        const newAccount = new Account({
          username: mappedUser[userIdField],
          password: mappedUser[userIdField], // Using ID as initial password
          email: mappedUser.email,
          roleId: roleId,
        });
        await newAccount.save({ session });
        createdAccounts.push(newAccount);

        // Create user
        const newUser = new UserModel(mappedUser);
        await newUser.save({ session });
        createdUsers.push(newUser);
      }

      await session.commitTransaction();
      
      return {
        success: true,
        users: createdUsers,
        accounts: createdAccounts,
        message: `Successfully created ${createdUsers.length} users`
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

}

module.exports = {
  FileProcessingUtil,
  BulkUserCreationUtil
};