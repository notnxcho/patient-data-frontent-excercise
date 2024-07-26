import './SkeletonCardStyles.scss'

const SkeletonCard = () => {
  return (
    <div className="skeleton-card-container">
      <div className="skeleton-header">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-name"></div>
      </div>
      <div className="skeleton-description"></div>
      <div className="skeleton-footer"></div>
    </div>
  )
}

export default SkeletonCard