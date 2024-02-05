import { Button } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import adminApi from 'src/apis/adminApi'
import Table from 'src/components/Table'
import { useTypingDebounce } from 'src/hooks'
import { IUser } from 'src/types/user'
import { getHeaderColumns, getNewHeaderColumn } from 'src/utils'
import translateVi from 'src/utils/translateVi'
import CreateAccount from './CreateAccount'
import DeleteAccount from './DeleteUser'
import MultiDeleteAccount from './MultiDeleteAccount'
import UploadAccountByExcel from './UploadAccountByExcel'

const columnsHeader: GridColDef[] = [
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 120,
  },
  {
    field: 'email',
    headerName: 'Địa chỉ email',
    width: 200,
  },
  {
    field: 'fullName',
    headerName: 'Họ và tên',
    width: 150,
  },
  { field: 'phone', headerName: 'Số điện thoại', width: 200 },
  {
    field: 'gender',
    headerName: 'Giới tính',
    width: 120,
  },
  { field: 'course', headerName: 'Khóa học' },
  { field: 'isPaid', headerName: 'Đã Nộp' },
]

export default function StudentList() {
  const [users, setUsers] = useState<IUser[]>([])
  const [userId, setUserId] = useState<string | number>('')
  const [userIds, setUserIds] = useState<string[] | number[]>([])
  const [loading, setLoading] = useState(false)

  //pagination
  const [total, setTotal] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(5)
  const [page, setPage] = useState<number>(1)

  //debounce
  const [value, setValue] = useState<string>()
  const debouncedValue = useTypingDebounce(value)
  const [email, setEmail] = useState<string>()

  //modal
  const [showDelete, setShowDelete] = useState(false)
  const [showMultiDelete, setShowMultiDelete] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [showUpload, setShowUpload] = useState(false)

  //check status
  const [isCreateCompleted, setIsCreateCompleted] = useState(false)
  const [isDeleteCompleted, setIsDeleteCompleted] = useState(false)
  const [isMultiDeleteCompleted, setIsMultiDeleteCompleted] = useState(false)
  const [isUpdateCompleted, setIsUpdateCompleted] = useState(false)
  const [isUploadCompleted, setIsUploadCompleted] = useState(false)

  useEffect(() => {
    getStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, page, pageSize])

  useEffect(() => {
    if (
      isCreateCompleted ||
      isDeleteCompleted ||
      isMultiDeleteCompleted ||
      isUpdateCompleted ||
      isUploadCompleted
    ) {
      getStudents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isCreateCompleted,
    isDeleteCompleted,
    isMultiDeleteCompleted,
    isUpdateCompleted,
    isUploadCompleted,
  ])

  //debounce to search
  useEffect(() => {
    setEmail(debouncedValue)
  }, [debouncedValue])

  const getStudents = async () => {
    setLoading(true)
    const params = { active: email, page, limit: pageSize }
    // console.log("params nè", params);
    try {
      const response = await adminApi.getStudents(params)
      const { users, total }: any = response
      // console.log(users, total);

      if (users.length > 0) {
        const keys = getHeaderColumns(users[0], ['account'])
        const data = getNewHeaderColumn(users, keys, page, pageSize)

        const userData = data.map((data, index) => {
          return {
            ...data,
            email: users[index].account.email,
            role: translateVi(users[index].account.role),
            status: users[index].account.isActive ? 'Hoạt động' : 'Đang khoá',
          }
        })

        setUsers(userData)
      } else {
        setUsers(users)
      }
      setLoading(false)
      setTotal(total)
    } catch (error) {
      console.log('lỗi rồi', { error })
      setLoading(false)
    }
  }

  const handleDelete = (id: string | number) => {
    setUserId(id)
    setShowDelete(true)
  }

  const handleMultiDeleted = (ids: string[] | number[]) => {
    setUserIds(ids)
    setShowMultiDelete(true)
  }

  return (
    <>
      <Table
        btnHandle={
          <>
            <Button variant="contained" color="success" onClick={() => setShowUpload(true)}>
              Upload file excel
            </Button>
          </>
        }
        onPage={(page) => setPage(Number(page))}
        onPageSize={(pageSize) => setPageSize(Number(pageSize))}
        getRowId={(row) => row._id}
        titleBtnAdd="Tạo tài khoản mới"
        isLoading={loading}
        title="Danh sách thông tin học sinh"
        columnsData={columnsHeader}
        rowsData={users}
        total={total}
        handleAddItem={() => setShowCreate(true)}
        onDeleteItem={handleDelete}
        onDeleteSelectMultiItem={handleMultiDeleted}
        isViewActions={false}
      />
      <DeleteAccount
        isUpdate={(status) => setIsDeleteCompleted(status)}
        id={userId}
        show={showDelete}
        onClose={() => setShowDelete(false)}
        setShow={setShowDelete}
      />
      <MultiDeleteAccount
        isUpdate={(status) => setIsMultiDeleteCompleted(status)}
        ids={userIds}
        show={showMultiDelete}
        onClose={() => setShowMultiDelete(false)}
        setShow={setShowMultiDelete}
      />
      <CreateAccount
        isUpdate={(status) => setIsCreateCompleted(status)}
        show={showCreate}
        onClose={() => setShowCreate(false)}
        setShow={setShowCreate}
      />
      <UploadAccountByExcel
        isUpdate={(status) => setIsUploadCompleted(status)}
        show={showUpload}
        onClose={() => setShowUpload(false)}
        setShow={setShowUpload}
      />
    </>
  )
}
