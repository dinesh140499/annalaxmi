// components/Pagination.tsx
import React from "react";
import { GrPrevious, GrNext } from "react-icons/gr";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  visibleLimit?: number;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  visibleLimit = 10,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    let start = 1;
    let end = visibleLimit;

    if (currentPage > Math.floor(visibleLimit / 2)) {
      start = currentPage - Math.floor(visibleLimit / 2);
      end = currentPage + Math.floor(visibleLimit / 2);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - visibleLimit + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const renderPages = () => {
    const pages = getPageNumbers();

    return (
      <>
        {pages.map((page) => (
          <p
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer duration-75 ${
              page === currentPage
                ? "bg-[#00603A] text-white"
                : "hover:bg-[#00603A] hover:text-white"
            }`}
          >
            {page}
          </p>
        ))}
        {pages[pages.length - 1] < totalPages && (
          <>
            <span className="px-1">...</span>
            <p
              onClick={() => onPageChange(totalPages)}
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer duration-75 ${
                currentPage === totalPages
                  ? "bg-[#00603A] text-white"
                  : "hover:bg-[#00603A] hover:text-white"
              }`}
            >
              {totalPages}
            </p>
          </>
        )}
      </>
    );
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <div
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="h-8 w-8 rounded-full cursor-pointer flex items-center justify-center bg-[#F2F2F2] hover:bg-white border border-[#F2F2F2]"
      >
        <GrPrevious />
      </div>
      {renderPages()}
      <div
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="h-8 w-8 rounded-full cursor-pointer flex items-center justify-center bg-[#F2F2F2] hover:bg-white border border-[#F2F2F2]"
      >
        <GrNext />
      </div>
    </div>
  );
};

export default Pagination;
