import { Tooltip } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useHover } from 'src/hooks'
import { ICourse } from 'src/types'
import formatCharacter from 'src/utils/formatCharacter'
import CourseModal from '../CourseModal'
import './CourseItem.scss'

interface CourseItemProps {
  courseInfo: ICourse
}
const CourseItem: React.FC<CourseItemProps> = ({ courseInfo }) => {
  const navigate = useNavigate()

  const { nodeRef, show } = useHover()

  return (
    <div className="course-item">
      <div className="img" ref={nodeRef} style={{ borderRadius: '20px' }}>
        <img
          style={{ borderRadius: '20px' }}
          src={courseInfo.thumbnail}
          alt="img"
          onClick={() => navigate(`/courses/${courseInfo.slug}`)}
        />
        {show && <CourseModal course={courseInfo} />}
      </div>
      <div className="content">
        <Tooltip title={courseInfo.name || ''}>
          <span className="name">{courseInfo.name}</span>
        </Tooltip>
        {(courseInfo.currentPrice || 0) > 0 ? (
          <span className="current_price" style={{ color: 'orange', fontWeight: 'bold' }}>
            <b style={{ color: 'black', fontWeight: 'bold' }}>Giá: </b>
            {formatCharacter.numberLocale(courseInfo.currentPrice, ' đồng')}
            <span className="original_price">
              {formatCharacter.numberLocale(courseInfo.originalPrice, ' đồng')}
            </span>
          </span>
        ) : (
          <span className="current_price">
            <b>Giá:</b> <span className="free">Miễn phí</span>
          </span>
        )}
      </div>
    </div>
  )
}

export default CourseItem
