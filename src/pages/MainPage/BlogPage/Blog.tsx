import { Box, Divider } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import blogApi from "src/apis/blogApi";
import ModalContainer from "src/components/ModalContainer";
import { IBlog } from "src/types";
import * as Yup from "yup";
import FormControl from "src/components/FormControl";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "./Blog.scss";

const Blog: React.FC = () => {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [blogToDeleteId, setBlogToDeleteId] = React.useState<number | null>(
    null
  );
  const [blogs, setBlogs] = React.useState<IBlog[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedBlog, setSelectedBlog] = React.useState<IBlog | null>(null);

  const handleClickOpenDelete = (id: number) => {
    setOpenDelete(true);
    setBlogToDeleteId(id);
  };

  const handleClickCloseDelete = () => {
    setOpenDelete(false);
  };

  const initialValues: IBlog = { id: 0, title: "", purpose: "", content: "" };

  useEffect(() => {
    fetchBlogs();
  }, []);
  const fetchBlogs = () => {
    blogApi
      .getBlog()
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch blogs:", error);
      });
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    purpose: Yup.string().required("Purpose is required"),
    content: Yup.string().required("Content is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      blogApi
        .CreateNewBlog(values)
        .then(() => {
          toast.success("Bài viết đã được tạo thành công!", {
            position: "bottom-right",
          });
          fetchBlogs();
        })
        .catch((error) => {
          console.error("Failed to create blog:", error);
          toast.error("Tạo bài viết không thành công.", {
            position: "bottom-right",
          });
        });
      handleClose();
    },
  });

  const handleClickOpen = (blog: IBlog | null = null) => {
    setSelectedBlog(blog);
    formik.setValues(blog || initialValues);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBlog(null);
    formik.resetForm();
  };

  const handleDelete = async (id: number | null) => {
    try {
      if (id !== null) {
        await blogApi.DeleteBlog(id);
        const updatedBlogs = blogs.filter((blog: IBlog) => blog.id !== id);
        setBlogs(updatedBlogs);
        toast.success("Bài viết đã được xóa thành công!", {
          position: "bottom-right",
        });
      } else {
        toast.error("Không thể xóa bài viết. Vui lòng thử lại sau!", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error("Không thể xóa bài viết. Vui lòng thử lại sau!", {
        position: "bottom-right",
      });
    }
  };

  return (
    <React.Fragment>
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
              onClick={() => handleDelete(blogToDeleteId)}
              autoFocus
              style={{ backgroundColor: "blue", color: "white" }}
            >
              Xóa bài viết
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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
          variant="contained"
          onClick={() => handleClickOpen()}
        >
          <i className="fa-solid fa-plus pr-1"></i> Thêm bài viết
        </Button>
      </div>
      <div className="container">
        {blogs &&
          blogs.map((blog: IBlog) => (
            <div key={blog.id}>
              <div className="text-center pt-16 md:pt-32">
                <i
                  className="fa-solid fa-trash icon-bin-blog"
                  onClick={() => handleClickOpenDelete(blog.id)}
                ></i>

                <p className="text-sm md:text-base text-green-500 font-bold mt-8">
                  08 MARCH 2024 <span className="text-gray-900"> | </span>{" "}
                  {blog.purpose}
                </p>
                <h1 className="font-bold break-normal text-3xl md:text-5xl ">
                  {blog.title}
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
                    <p className="py-6">{blog.content}</p>
                  </div>
                </div>
              </div>
              <Divider style={{ paddingTop: "60px", paddingBottom: "-60px" }} />
            </div>
          ))}
      </div>
      {/* Modal add Blog //////////////////////////////*/}
      <ModalContainer
        title="Thông tin chi tiết bài viết"
        open={open}
        onClose={handleClose}
      >
        <form
          id="create-blog"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 20,
          }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            required
            name="title"
            label="Tiêu đề bài viết"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            required
            name="purpose"
            label="Mục tiêu chính"
            value={formik.values.purpose}
            onChange={formik.handleChange}
            error={formik.touched.purpose && Boolean(formik.errors.purpose)}
            helperText={formik.touched.purpose && formik.errors.purpose}
          />
          <TextField
            required
            name="content"
            label="Nội dung của bài viết"
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
        </form>
        <Box sx={{ marginTop: 4 }}>
          <Button
            form="create-blog"
            variant="contained"
            color="primary"
            type="submit"
          >
            Tạo bài viết
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleClose}
            sx={{ marginLeft: 1 }}
          >
            Huỷ bỏ
          </Button>
        </Box>
      </ModalContainer>
    </React.Fragment>
  );
};

export default Blog;
