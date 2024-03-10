import React from "react";
import { Divider } from "@mui/material";
import "./Blog.scss";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Blog: React.FC = () => {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const [formData, setFormData] = React.useState({
    title: "",
    purpose: "",
    date: "",
    content: "",
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission, you can use formData to submit data
    console.log(formData);
  };
  return (
    <React.Fragment>
      <div
        className="btn-return"
        onClick={() => {
          window.location.href = "http://localhost:3000/";
        }}
      >
        <i className="fa-solid fa-arrow-left"></i> Quay lại
      </div>
      <div
        className="search-bar"
        style={{ display: "flex", alignItems: "center" }}
      >
        <FormControl
          fullWidth
          sx={{ m: 1 }}
          variant="standard"
          style={{ flex: "1" }}
        >
          <Input
            id="standard-adornment-amount"
            type="text"
            placeholder="Search ...."
          />
          <Button type="submit" className="btn-search">
            Search
          </Button>
        </FormControl>
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
          <i className="fa-solid fa-plus"></i> Thêm bài viết
        </Button>
      </div>

      {/* Modal add Blog //////////////////////////////*/}
      <BootstrapDialog
        onClose={handleCloseAdd}
        aria-labelledby="customized-dialog-title"
        open={openAdd}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Thông tin chi tiết bài viết
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseAdd}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Tiêu đề bài viết"
                name="title"
                value={formData.title}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                placeholder=""
                required
              />
              <TextField
                fullWidth
                label="Mục tiêu chính"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                placeholder="BLOG DAILY"
                required
              />
              <TextField
                fullWidth
                label="Ngày đăng bài viết"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
              <TextField
                fullWidth
                label="Nội dung của bài viết"
                name="content"
                value={formData.content}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </form>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>Hủy bỏ</Button>
          <Button onClick={handleCloseAdd} autoFocus>
            Đăng bài
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/* modal delete ////////////////////////////////*/}
      <div>
        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Bạn có muốn xóa bài viết không?"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleCloseDelete}>Hủy bỏ</Button>
            <Button onClick={handleCloseDelete} autoFocus>
              Xóa bài viết
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* Bài đăng blog /////////////////////////*/}
      <div>
        <div className="text-center pt-16 md:pt-32  mb-8">
          <i
            className="fa-solid fa-trash icon-bin-blog"
            onClick={handleClickOpenDelete}
          ></i>

          <p className="text-sm md:text-base text-green-500 font-bold mt-8">
            08 MARCH 2024 <span className="text-gray-900"> | </span> BLOG DAILY
          </p>
          <h1 className="font-bold break-normal text-3xl md:text-5xl ">
            Welcome to Binh Tom
          </h1>
        </div>
        <div className="container max-w-5xl mx-auto -mt-32">
          <div className="mx-0 sm:mx-6">
            <div
              className="bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <p className="py-6">
                The basic blog page layout is available and all using the
                default Tailwind CSS classNamees (although there are a few
                hardcoded style tags). If you are going to use this in your
                project, you will want to convert the classNamees into
                components.
              </p>
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </React.Fragment>
  );
};

export default Blog;
