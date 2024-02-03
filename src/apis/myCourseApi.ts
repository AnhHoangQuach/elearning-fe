import axiosClient from "./axiosClient";

const MYCOURSE_APi = "/my-courses";

const myCourseApi = {
  getMyCourse: (params?: any) => {
    const url = MYCOURSE_APi;
    return axiosClient.get(url, { params });
  },
  getMyCourseDetail: (id?: string) => {
    const url = MYCOURSE_APi + "/" + id;
    return axiosClient.get(url);
  },
  updateTimeLineVideoCourse: (id?: string, data?: any) => {
    const url = MYCOURSE_APi + "/" + id;
    return axiosClient.put(url, data);
  },
};

export default myCourseApi;
