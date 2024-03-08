import React from "react";
import { Divider } from "@mui/material";
import "./Blog.scss";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DatePicker from "@mui/lab/DatePicker";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Blog: React.FC = () => {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  return (
    <React.Fragment>
      <form className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="search"
            id="standard-basic"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
              bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search ... "
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 
              focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 
              dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <div>
        <button type="submit" onClick={handleOpenAdd}>
          <i className="fa-solid fa-plus"></i>
          Thêm bài viết
        </button>
      </div>
      <div>
        <div className="text-center pt-16 md:pt-32  mb-8">
          <i
            className="fa-solid fa-trash icon-bin-blog"
            onClick={handleOpenDelete}
          ></i>
          <p className="text-sm md:text-base text-green-500 font-bold mt-8">
            04 AUGUST 2023 <span className="text-gray-900">/</span> BLOG DAILY
          </p>
          <h1 className="font-bold break-normal text-3xl md:text-5xl ">
            Welcome to Ghostwind CSS
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
      </div>

      <Divider />

      {/* Modal Add */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="p-8"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bạn có chắc muốn xoá bài viết này không?
          </Typography>
          <Button variant="contained" color="warning">
            Xoá tài khoản
          </Button>
          <Button variant="contained" color="success">
            Huỷ bỏ
          </Button>
        </Box>
      </Modal>

      {/* modal delete */}
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="p-8"
      >
        <Box>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tên tiêu đề
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
            />
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nội dung
          </label>
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default Blog;
