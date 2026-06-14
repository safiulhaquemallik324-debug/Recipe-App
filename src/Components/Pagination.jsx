function Pagination({
    currentPage,
    totalPages,
    setCurrentPage,
  }) {
    if (totalPages <= 1) return null;
  
    return (
      <div className="pagination">
  
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >
          &laquo;
        </button>
  
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          &lsaquo;
        </button>
  
        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index + 1}
              className={
                currentPage === index + 1
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCurrentPage(index + 1)
              }
            >
              {index + 1}
            </button>
          )
        )}
  
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          &rsaquo;
        </button>
  
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(totalPages)
          }
        >
          &raquo;
        </button>
  
      </div>
    );
  }
  
  export default Pagination;