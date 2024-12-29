import { useState, useEffect } from 'react';
import Pager from '../footer/pager';

const Table = ({ onRowClicked, headings, data, readOnly = true, rowsPerPage = 0, className }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState(data);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [filters, setFilters] = useState(() =>
    headings.reduce((acc, heading) => ({ ...acc, [heading.id]: '' }), {})
  );
  const [filterVisible, setFilterVisible] = useState(() =>
    headings.reduce((acc, heading) => ({ ...acc, [heading.id]: false }), {})
  );

  useEffect(() => {
    let filteredData = data.filter((row) =>
      headings.every(
        (heading) =>
          !filters[heading.id] || row[heading.id]?.toString().toLowerCase().includes(filters[heading.id].toLowerCase())
      )
    );

    if (rowsPerPage > 0) {
      setNumberOfPages(Math.max(1, Math.ceil(filteredData.length / rowsPerPage)));
    }

    if (currentPage > numberOfPages) {
      setCurrentPage(numberOfPages);
    }

    if (sortConfig.key) {
      filteredData.sort((a, b) => {
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
      setPaginatedData(filteredData.slice(start, end));
    } else {
      setPaginatedData(filteredData);
    }
  }, [data, currentPage, sortConfig, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (columnId) => {
    let direction = 'asc';
    if (sortConfig.key === columnId && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnId, direction });
  };

  const toggleFilterBox = (columnId) => {
    setFilterVisible((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const handleFilterChange = (columnId, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [columnId]: value }));
    setCurrentPage(1);
  };

  const SortIcon = ({ direction }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 inline-block"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {direction === 'asc' ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      )}
    </svg>
  );

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col flex-grow">
        <div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-m text-gray-700 bg-gray-200 top-0">
              <tr>
                {headings.map((heading, index) => (
                  <th key={index} className="px-6 py-3 relative">
                    <div className="flex justify-between items-center">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleSort(heading.id)}
                      >
                        {heading.label}
                        <div className="inline-block ml-1" />
                        {sortConfig.key === heading.id && <SortIcon direction={sortConfig.direction} />}
                      </span>
                      <button
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2  ${filters[heading.id] ? 'text-blue-500' : 'text-gray-500'
                          }`}
                        onClick={() => toggleFilterBox(heading.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          width="16"
                          height="16"
                        >
                          <rect x="1" y="3" width="14" height="2" />
                          <rect x="3" y="7" width="10" height="2" />
                          <rect x="5" y="11" width="6" height="2" />
                        </svg>
                      </button>
                    </div>
                    {filterVisible[heading.id] && (
                      <div className="mt-2 absolute right-2 top-full z-10 bg-white shadow-lg border rounded-md p-2">
                        <input
                          type="text"
                          placeholder={`Filter ${heading.label}`}
                          value={filters[heading.id]}
                          onChange={(e) => handleFilterChange(heading.id, e.target.value)}
                          className="w-full text-sm border rounded-md px-2 py-1"
                        />
                      </div>
                    )}
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

        {rowsPerPage > 0 && (
          <div className="flex justify-center pt-4">
            <Pager currentPage={currentPage} numberOfPages={numberOfPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
