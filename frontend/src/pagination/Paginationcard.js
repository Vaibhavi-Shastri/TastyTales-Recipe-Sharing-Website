import React from 'react';
import './pagination.css';
const Pagination = ({currentPage, totalPages, setCurrentPage }) => {

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleClick = (number) => {
        setCurrentPage(number);
    };

    const renderPageNumbers = () => {
        if (totalPages <= 5) {
        return pageNumbers.map((number) => (
            <button
            key={number}
            className={`page-number ${number === currentPage ? 'active' : ''}`}
            onClick={() => handleClick(number)}
            >
            {number}
            </button>
        ));
        }

        const pages = [];
        if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
            pages.push(i);
        }
        pages.push('...', totalPages);
        } else if (currentPage > totalPages - 3) {
        pages.push(1, '...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
            pages.push(i);
        }
        } else {
        pages.push(1, '...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
        }
        pages.push('...', totalPages);
        }

    return pages.map((number, index) => (
      <button
        key={index}
        className={`page-number ${number === currentPage ? 'active' : ''}`}
        onClick={() => typeof number === 'number' && handleClick(number)}
        disabled={typeof number !== 'number'}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="pagination">
      <button
        className="page-number"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        className="page-number"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
