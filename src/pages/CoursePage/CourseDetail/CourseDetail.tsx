import { Box, Divider } from '@mui/material'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import courseApi from 'src/apis/courseApi'
import ArticleReadMore from 'src/components/ArticleReadMore'
import BoxContent from 'src/components/BoxContent'
import MediaContent from 'src/components/MediaContent'
import NavigationHeader from 'src/components/NavigationHeader'
import Pagination from 'src/components/Pagination'
import TextContent from 'src/components/TextContent'
import { getPanelActive, getVideoView } from 'src/reducers'
import { ICourse } from 'src/types'
import formatCharacter from 'src/utils/formatCharacter'
import translateVi from 'src/utils/translateVi'
import BtnAddCart from '../BtnAddCart'
import CourseContainer from '../CourseContainer'
import CourseSummary from '../CourseSummary'
import CourseTarget from '../CourseTarget'
import './CourseDetail.scss'

const CourseDetail = () => {
  document.title = 'Thông tin chi tiết khoá học'
  const { id } = useParams()
  const dispatch = useDispatch()

  const [courseDetail, setCourseDetail] = useState<ICourse>({})
  const [courseRelates, setCourseRelates] = useState<ICourse[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false)

  //search
  const [limit, setLimit] = useState(4)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState<number>(0)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getPanelActive(''))
    dispatch(getVideoView(''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  //call page
  useEffect(() => {
    window.screen.width <= 430 && setLimit(1)
  }, [])

  useEffect(() => {
    getCourseDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    courseDetail.slug && getCourseRelates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseDetail.slug, limit, page])

  const getCourseDetail = async () => {
    setIsLoadingDetail(true)
    try {
      const response = await courseApi.getCourseDetail(id)
      const { course }: any = response
      setCourseDetail(course)
      setIsLoadingDetail(false)
      // console.log("course", course);
    } catch (error) {
      setIsLoadingDetail(false)
      console.log('lỗi', { error })
    }
  }

  const getCourseRelates = async () => {
    const params = { limit, page }
    // console.log("params", params);
    setIsLoading(true)
    try {
      const response = await courseApi.getCoursesRelated(courseDetail.slug, params)
      // console.log("response", response);
      const { courses, total }: any = response
      // console.log(" courses", courses);
      setTotal(formatCharacter.numberRound(total / limit))
      setIsLoading(false)
      setCourseRelates(courses)
    } catch (error) {
      setIsLoading(false)
      console.log('lỗi rồi', { error })
    }
  }

  return (
    <>
      <NavigationHeader />
      <div className="courses-detail">
        <TextContent.NormalText type="title-header-large" content="Thông tin chi tiết khoá học" />
        <div className="course-preview">
          <div className="info">
            <MediaContent.Image src={courseDetail.thumbnail} />
            <TextContent.NormalText content={courseDetail.name as string} />
            <span className="description">
              <ArticleReadMore title="Mô tả khoá học" content={courseDetail.description} />
            </span>
          </div>
          <div className="content-detail">
            <div className="detail-info">
              <TextContent.NormalText content="Thông tin khoá học" />

              {courseDetail.currentPrice! > 0 ? (
                <span className="flex-row">
                  <BoxContent.ContentInfo
                    type="fit-content"
                    title="Giá hiện tại: "
                    content={
                      courseDetail.currentPrice &&
                      formatCharacter.numberLocale(courseDetail.currentPrice, ' đồng')
                    }
                  />
                  <BoxContent.ContentInfo
                    type="fit-content"
                    title=""
                    content={
                      courseDetail.originalPrice &&
                      formatCharacter.numberLocale(courseDetail.originalPrice, ' đồng')
                    }
                    contentStyle={{
                      textDecoration: 'line-through',
                      color: 'rgb(119, 119, 119)',
                    }}
                  />
                </span>
              ) : (
                <BoxContent.ContentInfo
                  type="fit-content"
                  title="Giá hiện tại: "
                  content="Miễn phí"
                  contentStyle={{
                    padding: '1px 10px',
                    background: 'rgb(115, 116, 17)',
                    borderRadius: 4,
                    color: 'white',
                    userSelect: 'none',
                  }}
                />
              )}

              <BoxContent.ContentInfo
                responsive={false}
                type="fit-content"
                title="Dành cho: "
                content={translateVi(courseDetail.level)}
              />

              {/* btn add cart */}
              <BtnAddCart courseId={courseDetail._id} isBought={courseDetail.isBought} />
              {/* <button type="button" className="btnRegister" >Đăng kí ngay</button> */}
            </div>
            <CourseSummary title="Thông tin chi tiết khoá học" chapters={courseDetail.chapters} />
            <CourseTarget
              title="Đối tượng nào nên học?"
              content={courseDetail.intendedLearners}
              isLoading={isLoadingDetail}
            />
            <CourseTarget
              title="Kiến thức bắt buộc cần có?"
              content={courseDetail.requirements}
              isLoading={isLoadingDetail}
            />
            <CourseTarget
              title="Bạn sẽ học được gì?"
              content={courseDetail.targets}
              isLoading={isLoadingDetail}
            />
          </div>
        </div>

        <Divider sx={{ marginY: 20 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 90,
            paddingBottom: 10,
          }}
        >
          <CourseContainer
            title="Khoá học liên quan"
            courses={courseRelates}
            isLoading={isLoading}
          />
          {total > 0 && (
            <Pagination
              pageActive={page}
              total={total}
              onChangeValue={(value: number) => setPage(value)}
            />
          )}
        </Box>
      </div>
    </>
  )
}
export default CourseDetail
