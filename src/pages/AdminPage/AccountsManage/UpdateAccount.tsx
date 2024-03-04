import { Box, Button } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import adminApi from 'src/apis/adminApi'
import FormControl from 'src/components/FormControl'
import ModalContainer from 'src/components/ModalContainer'
import { accountTypes, genderTypes, statusTypes, studentTypes } from 'src/data'
import { isPending, isSuccess } from 'src/reducers'
import { ICourse, IUser } from 'src/types'
import * as Yup from 'yup'

interface UpdateAccountProps {
  id: string | number
  show?: boolean
  isUpdate: (status: boolean) => void
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
  onClose?: () => void
  courses?: ICourse[]
  isStudent?: boolean
}

const UpdateAccount: React.FC<UpdateAccountProps> = ({
  id,
  setShow,
  isUpdate,
  show = false,
  onClose,
  courses,
  isStudent = false,
}) => {
  const dispatch = useDispatch()
  const [userDetail, setUserDetail] = useState<IUser>({})
  const coursesType =
    courses?.map((courses) => ({ name: courses.name!, value: courses._id! })) ?? []

  useEffect(() => {
    id && getUserDetail(id)
  }, [id])

  const getUserDetail = async (id: any) => {
    try {
      const response = await adminApi.getUserDetail(id)
      const { user }: any = response
      setUserDetail(user)
    } catch (error) {
      console.log('lỗi rồi', { error })
    }
  }

  const handleUpdateAccount = async (values: any) => {
    const { role, birthday, fullName, gender, isActive, password, phone, courseId } = values
    isUpdate?.(false)
    dispatch(isPending())
    const params = {
      account: { password: password ? password : null, isActive, role },
      user: { fullName, birthday, gender, phone },
      courseId,
    }
    try {
      await adminApi.updateUserInfo(id, params)
      dispatch(isSuccess())
      setShow?.(false)
      isUpdate?.(true)
      toast.success('Cập nhật thông tin tài khoản thành công', {
        position: 'bottom-right',
      })
    } catch (error) {
      console.log('lỗi rồi', { error })
      dispatch(isSuccess())
      setShow?.(false)
      toast.warning('Cập nhật thông tin tài khoản thất bại', {
        position: 'bottom-right',
      })
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      role: userDetail.account?.role,
      fullName: userDetail.fullName,
      password: '',
      birthday: userDetail.birthday,
      gender: userDetail.gender,
      phone: userDetail.phone,
      isActive: userDetail.account?.isActive,
      isPaid: userDetail.myCourse?.isPaid,
      courseId: userDetail.myCourse?.course,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Vui lòng nhập họ tên'),
      password: Yup.string().min(8, 'Mật khẩu ít nhất 8 kí tự'),
      // phone: Yup.string()
      //   .matches(phoneRegExp, "Định dạng số điện thoại sai")
      //   .max(10, "Định dạng số điện thoại sai")
      //   .min(10, "Định dạng số điện thoại sai"),
    }),
    onSubmit: async (values) => {
      // console.log("lấy được dữ liệu là", values);
      handleUpdateAccount(values)
    },
  })

  return (
    <ModalContainer title="Cập nhật thông tin tài khoản" open={show} onClose={onClose}>
      <form
        id="update-account"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 20,
        }}
        onSubmit={formik.handleSubmit}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginY: 8 }}>
          <FormControl.Input
            label="Địa chỉ email"
            placeholder="Nhập địa chỉ email"
            value={userDetail.account?.email}
            disabled
          />
          <FormControl.Input
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            errorMessage={formik.touched.fullName ? formik.errors.fullName : ''}
            {...formik.getFieldProps('fullName')}
          />
          <FormControl.Input
            type="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            errorMessage={formik.touched.password ? formik.errors.password : ''}
            {...formik.getFieldProps('password')}
          />
          <FormControl.InputSelect
            label="Chức vụ"
            list={isStudent ? studentTypes : accountTypes}
            onChange={(e) => formik.setFieldValue('role', e.target.value)}
            defaultValue={formik.values.role}
            style={{ border: '1px solid #e2e8f0' }}
          />
          <FormControl.InputSelect
            label="Giới tính"
            list={genderTypes}
            onChange={(e) => formik.setFieldValue('gender', e.target.value)}
            defaultValue={formik.values.gender}
            style={{ border: '1px solid #e2e8f0' }}
          />
          <FormControl.InputSelect
            label="Trạng thái"
            list={statusTypes}
            onChange={(e) => formik.setFieldValue('isActive', e.target.value)}
            defaultValue={formik.values.isActive}
            style={{ border: '1px solid #e2e8f0' }}
          />
          <FormControl.Input
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            errorMessage={formik.touched.phone ? formik.errors.phone : ''}
            {...formik.getFieldProps('phone')}
          />
          <FormControl.Input
            type="date"
            label="Ngày sinh nhật"
            {...formik.getFieldProps('birthday')}
          />
          {isStudent && (
            <FormControl.InputSelect
              label="Khóa học"
              list={coursesType}
              onChange={(e) => {
                formik.setFieldValue('courseId', e)
              }}
              style={{ border: '1px solid #e2e8f0' }}
              defaultValue={formik.values.courseId as string}
            />
          )}
        </Box>
      </form>
      <Button form="update-account" type="submit" variant="contained" color="warning">
        Cập nhật thông tin
      </Button>
      <Button variant="contained" color="success" onClick={onClose} sx={{ marginLeft: 1 }}>
        Huỷ bỏ
      </Button>
    </ModalContainer>
  )
}

export default UpdateAccount
