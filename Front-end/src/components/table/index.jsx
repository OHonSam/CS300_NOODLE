import { useState, useEffect } from 'react';
import Pager from '../footer/pager';

const Table = ({ children, onRowClicked, headings, data, readOnly = true, rowsPerPage = 0, className }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  useEffect(() => {
    let sortedData = [...data];

    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    if (rowsPerPage > 0) {
      const start = (currentPage - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      setPaginatedData(sortedData.slice(start, end));
    } else {
      setPaginatedData(sortedData);
    }
  }, [data, currentPage, rowsPerPage, sortConfig]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const handleSort = (columnId) => {
    let direction = 'asc';
    if (sortConfig.key === columnId && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnId, direction });
  };

  const numberOfPages = rowsPerPage > 0 ? Math.ceil(data.length / rowsPerPage) : 1;


  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col flex-grow">
        <div className="overflow-y-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-m text-gray-700 bg-gray-200 sticky top-0">
              <tr>
                {headings.map((heading, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort(heading.id)}
                  >
                    {heading.label}
                    {sortConfig.key === heading.id ? (
                      sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className={`bg-white border-b ${!readOnly && 'hover:bg-gray-100'}`}>
                  {headings.map((heading, itemIndex) => (
                    <td
                      key={itemIndex}
                      scope="row"
                      className="px-6 py-4 select-none"
                      onClick={() => onRowClicked(row)}
                    >
                      {row[heading.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rowsPerPage > 0 && numberOfPages > 1 && (
          <div className="flex justify-center pt-4">
            <Pager numberOfPages={numberOfPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>

      {children}
    </div>
  );
};

export default Table