function SkeletonCard() {
    return (
      <div className="skeleton-card">
        <div className="skeleton-img"></div>
  
        <div className="skeleton-content">
          <div className="skeleton-line title"></div>
          <div className="skeleton-line small"></div>
  
          <div className="skeleton-row">
            <div className="skeleton-line mini"></div>
            <div className="skeleton-line mini"></div>
          </div>
  
          <div className="skeleton-row">
            <div className="skeleton-btn"></div>
            <div className="skeleton-btn"></div>
          </div>
        </div>
      </div>
    );
  }
  
  export default SkeletonCard;