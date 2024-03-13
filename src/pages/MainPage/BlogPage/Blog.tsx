import { Box, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import blogApi from "src/apis/blogApi";
import ModalContainer from "src/components/ModalContainer";
import { IBlog } from "src/types";
import * as Yup from "yup";
import "./Blog.scss";
import FormControl from 'src/components/FormControl'

const Blog: React.FC = () => {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [blog, setBlog] = React.useState<IBlog[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [blogToDeleteId, setBlogToDeleteId] = React.useState<number | null>(
    null
  );

  const handleClickOpenDelete = (id: number) => {
    setOpenDelete(true);
    setBlogToDeleteId(id);
  };

  const handleClickCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleClickCloseAdd = () => {
    setOpenAdd(false);
  };

  // const getBlog = async () => {
  //   try {
  //     const response = await blogApi.getBlog({ publish: true });
  //     const { courses }: any = response;
  //     setBlog(courses);
  //   } catch (error) {
  // console.log("lỗi nè", { error });
  //   }
  // };

  const getListBlog = (params?: Object) => {
    !loading && setLoading(true);
    blogApi
      .getBlog(params)
      .then((res: any) => {
        setLoading(false);
        setBlog(res);
      })
      .catch(() => setLoading(false));
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      purpose: "",
      content: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Vui lòng nhập tiêu đề"),
      purpose: Yup.string().required("Vui lòng nhập thể loại"),
      content: Yup.string().required("Vui lòng nhập nội dung"),
    }),
    onSubmit: async (values) => {
      blogApi
        .CreateNewBlog({
          ...values,
        })
        .then(() => {
          toast.success("Tạo bài viết thành công", {
            position: "bottom-right",
          });
          handleClickCloseAdd();
          getListBlog();
        });
    },
  });

  const handleDeleteBlog = async () => {
    // console.log("check delete id: ", id);
    if (blogToDeleteId !== null) {
      !loading && setLoading(true);
      try {
        await blogApi.DeleteBlog(blogToDeleteId);
        getListBlog();
        toast.success("Xóa bài viết thành công", {
          position: "bottom-right",
        });
      } catch (error) {
        // console.error("Lỗi khi xóa bài viết:", error);
        toast.error("Xóa bài viết thất bại", {
          position: "bottom-right",
        });
      }
      setLoading(false);
      setOpenDelete(false);
      setBlogToDeleteId(null);
    }
  };

  const resetDataForm = () => {
    formik.resetForm({
      values: {
        title: "",
        purpose: "",
        content: "",
      },
    })
  }

  return (
    <React.Fragment>
      {/* return */}
      <div
        className="btn-return"
        onClick={() => {
          window.location.href = "https://anhngusparkle.edu.vn/";
        }}
      >
        <i className="fa-solid fa-arrow-left"></i> Quay lại
      </div>
      <div>
        <Button
          type="button"
          className="inline-block rounded bg-primary px-6 pb-2 
          pt-2.5 text-xs font-medium uppercase leading-normal 
          text-white shadow-primary-3 transition duration-150 
          ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 
          focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none 
          focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 
          dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong btn-addBlog"
          variant="outlined"
          onClick={handleClickOpenAdd}
        >
          <i className="fa-solid fa-plus pr-1"></i> Thêm bài viết
        </Button>
      </div>

      {/* Modal add Blog //////////////////////////////*/}
      <ModalContainer
        title="Thông tin chi tiết bài viết"
        open={openAdd}
        onClose={() => {
          resetDataForm();
          handleClickCloseAdd();
        }}
      >
        <form
          id="create-blog"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 20,
          }}
          onSubmit={formik.handleSubmit}
        >
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            rowGap={12}
            onSubmit={formik.handleSubmit}
          >
            <FormControl.Input
              required
              label="Tiêu đề bài viết"
              placeholder="Tiêu đề bài viết"
              {...formik.getFieldProps('title')}
            />
            <FormControl.Input
              label="Mục tiêu chính"
              type="purpose"
              {...formik.getFieldProps("purpose")}
            />
            <FormControl.Input
              label="Nội dung của bài viết"
              type="content"
              {...formik.getFieldProps("content")}
            />   
          </Box>
        </form>
        <Box sx={{ marginTop: 4 }}>
          <Button form="create-blog" variant="contained" color="primary" type="submit">
            Tạo bài viết
          </Button>
          <Button variant="contained" color="success" onClick={handleClickCloseAdd} sx={{ marginLeft: 1 }}>
            Huỷ bỏ
          </Button>
        </Box>
      </ModalContainer>

      {/* modal delete ////////////////////////////////*/}
      <div>
        <Dialog
          open={openDelete}
          onClose={handleClickCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Bạn có muốn xóa bài viết không?"}
          </DialogTitle>

          <DialogActions>
            <Button
              onClick={handleClickCloseDelete}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Hủy bỏ
            </Button>
            <Button
              onClick={() => handleDeleteBlog()}
              autoFocus
              style={{ backgroundColor: "blue", color: "white" }}
            >
              Xóa bài viết
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* Bài đăng blog /////////////////////////*/}
      <div className="container">
        {blog.map((item: IBlog, index: number) => (
          <div key={index}>
            <div className="text-center pt-16 md:pt-32">
              <i
                className="fa-solid fa-trash icon-bin-blog"
                onClick={() => handleClickOpenDelete(index)}
              ></i>

              <p className="text-sm md:text-base text-green-500 font-bold mt-8">
                08 MARCH 2024 <span className="text-gray-900"> | </span>{" "}
                {item.purpose}
              </p>
              <h1 className="font-bold break-normal text-3xl md:text-5xl ">
                {item.title}
              </h1>
            </div>
            <div className="container max-w-5xl mx-auto -mt-24">
              <div className="mx-0 sm:mx-6">
                <div
                  className="bg-white w-full mb:p-16 md:text-2xl  text-xl text-gray-800 leading-normal"
                  style={{
                    fontFamily: "Georgia, serif",
                    marginTop: "100px",
                  }}
                >
                  <p className="py-6">{item.content}</p>
                </div>
              </div>
            </div>
            <Divider style={{ paddingTop: "60px", paddingBottom: "-60px" }} />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Blog;
