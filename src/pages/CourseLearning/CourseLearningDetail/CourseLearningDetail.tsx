import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import courseApi from 'src/apis/courseApi'
import myCourseApi from 'src/apis/myCourseApi'
import teacherApi from 'src/apis/teacherApi'
import NavigationHeader from 'src/components/NavigationHeader'
import TextContent from 'src/components/TextContent'
import CourseSummary from 'src/pages/CoursePage/CourseSummary'
import {
  getPanelActive,
  getQuestionState,
  getVideoView,
  selectAuthorization,
  setStudyLesson,
} from 'src/reducers'
import { ICourse, Role } from 'src/types'
import AcceptCourseLearning from '../AcceptCourseLearning'
import './CourseLearningDetail.scss'
import { notificationMessage } from 'src/utils'

const CourseLearningDetail = () => {
  document.title = 'Thông tin khoá học chi tiết'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [course, setCourse] = useState<ICourse>({})
  const [chapter, setChapter] = useState<any>()
  const { isRole, videoView } = useSelector(selectAuthorization)
  const { studyLesson } = useSelector(getQuestionState)
  const [showAccept, setShowAccept] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkByRole(isRole as Role)
      // dispatch(setLessonType("video"));
    }, 500)
    return () => {
      clearTimeout(timeout)
      dispatch(setStudyLesson({}))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const checkByRole = (isRole: Role) => {
    /**
     * ! Note: Mustn't use "return function()"
     * Because, it will end when call this function()
     * So use "return" when function() has completed or use "break"
     * In this case, I use "switch-case" -> so I use "break" for this situation
     */
    switch (isRole) {
      case 'student':
        getMyCourseDetail()
        break
      case 'teacher':
        getTeacherCourseDetails()
        break
      case 'admin':
        getAdminCourseDetail()
        break

      default:
        console.log(`Role ${isRole} doesn't have initial`)
        navigate('/login')
        break
    }
  }

  const getTeacherCourseDetails = async () => {
    try {
      const response = await teacherApi.getCourseDetails(id)
      // console.log("response", response);
      const { course }: any = response
      const { chapters }: any = course
      // console.log(" course nek", course);
      setCourse(course)
      setChapter(chapters)
      dispatch(setStudyLesson(chapters[0].lessons[0]))
    } catch (error) {
      console.log('lỗi rồi', { error })
    }
  }

  const getAdminCourseDetail = async () => {
    try {
      const response = await courseApi.viewCheckCourse(id)
      // console.log("response nek", response);
      const { course }: any = response
      const { chapters }: any = course
      // console.log(" course nek", course);
      setCourse(course)
      setChapter(chapters)
      dispatch(setStudyLesson(chapters[0].lessons[0]))
    } catch (error) {
      console.log('lỗi rồi', { error })
    }
  }

  const getMyCourseDetail = async () => {
    try {
      const response = await myCourseApi.getMyCourseDetail(id)
      const { myCourse }: any = response
      const { course, chapters, chapterOfLastView, lastView }: any = myCourse

      setCourse(course)
      setChapter(chapters)
      dispatch(setStudyLesson(chapters[0].lessons[0]))
      dispatch(getPanelActive('panel' + (chapterOfLastView?.number - 1)))
      dispatch(getVideoView(lastView))
    } catch (error) {
      console.log('lỗi rồi', { error })
    }
  }

  return (
    <React.Fragment>
      <NavigationHeader />
      <div className="my-course-detail">
        <div className="info">
          <span className="title">{course.name}</span>
          {/* for teacher */}
          {course.name && isRole === 'admin' && (
            <Button variant="contained" onClick={() => setShowAccept(true)}>
              Duyệt khoá học
            </Button>
          )}
        </div>
        <div className="my-course-video">
          <div className="stream">
            {studyLesson?.type === 'video' && (
              <></>
            )}
            {studyLesson?.type === 'quiz' && (
              <Box className="content-quiz-student">
                <Box className="title-question-student">
                  <TextContent.Label label={studyLesson?.title} />
                </Box>
                <Box className="action-question">
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (studyLesson?.completed === true) {
                        return notificationMessage('warning', 'Bạn đã hoàn thành bài test')
                      } else {
                        navigate(`/student/course/${course._id}/${studyLesson?._id}/quiz-detail`)
                      }
                    }}
                  >
                    Làm Bài Ngay
                  </Button>
                </Box>
              </Box>
            )}
            {studyLesson?.type === 'slide' && (
              <Box className="content-slide">
                <Box className="preview-content-action">
                  <Button variant="contained" className="button-download-file">
                    <a href={studyLesson?.slide}>Tải xuống tài liệu</a>
                  </Button>
                </Box>
                <Box className="preview-content-view">
                  <iframe
                    id="1"
                    width="100%"
                    height="700px"
                    title={studyLesson?.title}
                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${studyLesson?.slide}`}
                  />
                </Box>
              </Box>
            )}
          </div>
          <div className="chapters">
            <CourseSummary title="Thông tin chi tiết khoá học" chapters={chapter} />
          </div>
        </div>
      </div>
      {isRole === 'admin' && (
        <AcceptCourseLearning
          slug={course.slug}
          show={showAccept}
          onClose={() => setShowAccept(false)}
          setShow={setShowAccept}
        />
      )}
    </React.Fragment>
  )
}
export default CourseLearningDetail
