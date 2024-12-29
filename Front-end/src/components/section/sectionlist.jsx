import { useState, useEffect } from 'react';
import Section from "./section";
import Pager from "../footer/pager";

const SectionList = ({ data, onSectionClicked, onPageChange, rowsPerPage = 0, className, userType }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState(data);

  useEffect(() => {
    if (rowsPerPage > 0) {
      const start = (currentPage - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      setPaginatedData(data.slice(start, end));
    } else {
      setPaginatedData(data);
    }
  }, [data, currentPage, rowsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const numberOfPages = rowsPerPage > 0 ? Math.ceil(data.length / rowsPerPage) : 1;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col space-y-4 flex-grow">
        {paginatedData.map((section, index) => (
          <Section
            key={index}
            {...section}
            userType={userType}
            onClick={onSectionClicked}
          />
        ))}

        {rowsPerPage > 0 && numberOfPages > 1 && (
          <div className="flex justify-center">
            <Pager currentPage={currentPage} numberOfPages={numberOfPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionList;