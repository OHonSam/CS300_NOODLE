import React from 'react';

const Section = ({
  sectionId,
  courseName,
  teachersName,
  credits,
  schoolYear,
  semester,
  noOfStudents,
  gpa,
  noOfFails,
  userType, // Add userType prop
  onClick
}) => {
  const isTeacher = userType === 'teacher';

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white w-full hover:bg-gray-100 cursor-pointer" onClick={() => onClick()}>
      <div className="flex justify-between items-center pb-2">
        <h1 className="font-bold text-lg">{sectionId} - {courseName}</h1>
      </div>
      <div className={`grid ${isTeacher ? 'grid-cols-7' : 'grid-cols-5'} text-sm font-bold border-b pb-2 justify-items-center`}>
        <div className="col-span-1 justify-self-start">Teachers</div>
        <div>Credits</div>
        <div>Year</div>
        <div>Semester</div>
        <div>No. Students</div>
        {isTeacher && (
          <>
            <div>Avg. Score</div>
            <div>No. Fails</div>
          </>
        )}
      </div>

      <div className={`grid ${isTeacher ? 'grid-cols-7' : 'grid-cols-5'} text-sm pt-2`}>
        <div className="col-span-1 space-y-2 flex flex-col justify-center">
          {teachersName === undefined ? '-' :
            teachersName.map((teacher, index) => (
              <div key={index}>{teacher}</div>
            ))}
        </div>
        <div className={`${isTeacher ? 'col-span-6' : 'col-span-4'} space-y-2`}>
          <div className={`grid ${isTeacher ? 'grid-cols-6' : 'grid-cols-4'} justify-items-center items-center h-full`}>
            <div className="flex items-center">{credits === undefined ? '-' : credits}</div>
            <div className="flex items-center">{schoolYear === undefined ? '-' : schoolYear}</div>
            <div className="flex items-center">{semester === undefined ? '-' : semester}</div>
            <div className="flex items-center">{noOfStudents === undefined ? '-' : noOfStudents}</div>
            {isTeacher && (
              <>
                <div className="flex items-center">{gpa === undefined ? '-' : gpa.toFixed(2)}</div>
                <div className="flex items-center">{noOfFails === undefined ? '-' : noOfFails}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;