import { useState } from "react";

const Pager = ({ startPage = 1, numberOfPages, onPageChange, className }) => {
  const [currentPage, setCurrentPage] = useState(startPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages = [];

    if (numberOfPages <= 8) {
      for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, 6, '...', numberOfPages);
      } else if (currentPage >= numberOfPages - 3) {
        pages.push(1, '...', numberOfPages - 5, numberOfPages - 4, numberOfPages - 3, numberOfPages - 2, numberOfPages - 1, numberOfPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, currentPage + 2, '...', numberOfPages);
      }
    }

    return pages;
  };

  return (
    <nav aria-label="Page navigation example" className={className}>
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight ${currentPage === 1
              ? "text-gray-300 bg-gray-100 border-gray-300 cursor-not-allowed"
              : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              } border border-e-0 rounded-s-lg`}>
            <span className="sr-only">Previous</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
          </button>
        </li>
        {getPageNumbers().map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="flex items-center justify-center w-10 h-8 leading-tight text-gray-500 bg-white border border-gray-300">
                ...
              </span>
            ) : (
              <button
                onClick={() => handlePageClick(page)}
                className={`flex items-center justify-center w-10 h-8 leading-tight ${page === currentPage
                  ? "text-blue-600 border-blue-300 bg-blue-50"
                  : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  } border`}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            onClick={handleNextPage}
            disabled={currentPage === numberOfPages}
            className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === numberOfPages
              ? "text-gray-300 bg-gray-100 border-gray-300"
              : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              } border rounded-e-lg`}
          >
            <span className="sr-only">Next</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pager;