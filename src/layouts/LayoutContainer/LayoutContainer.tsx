import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./LayoutContainer.scss";

interface LayoutContainerProps {
  children: ReactNode;
  titleShow?: boolean;
  footerShow?: boolean;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({
  children,
  titleShow = true,
  footerShow = true,
}) => {
  const [showSupportItems, setShowSupportItems] = React.useState(false);
  const toggleSupportItems = () => {
    setShowSupportItems(!showSupportItems);
  };
  return (
    <div className="layout-container">
      <Header titleShow={titleShow} />

      <div className="support" onClick={toggleSupportItems}>
        <i className="fa-solid fa-phone-volume"></i> Hotline <> </>
        <i className="fa-solid fa-caret-up"></i>
      </div>
      {showSupportItems && <div className="support-items">0974640100</div>}
      <div className="body-container">{children}</div>

      {/* footer */}
      <div className="footer">
        <footer
          className="text-center text-lg-start text-dark"
          style={{ backgroundColor: "#ECEFF1" }}
        >
          <section
            className="d-flex justify-content-between p-4 text-white"
            style={{ backgroundColor: "#2d73dd" }}
          >
            <div className="me-5">
              <span>Get connected with us on social networks:</span>
            </div>
            <div
              style={{
                display: "inline",
              }}
            >
              <a
                href=""
                className="text-white me-4 ml-3 "
                style={{
                  borderRadius: "50%",
                  border: "1px solid white",
                  padding: "14px",
                }}
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href=""
                className="text-white me-4 ml-3"
                style={{
                  borderRadius: "50%",
                  border: "1px solid white",
                  padding: "13px",
                }}
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a
                href=""
                className="text-white me-4 ml-3"
                style={{
                  borderRadius: "50%",
                  border: "1px solid white",
                  padding: "13px",
                }}
              >
                <i className="fa-regular fa-envelope"></i>
              </a>
            </div>
          </section>

          <section className="">
            <div className="container text-center text-md-start mt-5 mb-10">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto">
                  <h6 className="text-uppercase fw-bold mb-2">
                    SPARKLE ENGLISH CENTER
                  </h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p className="text-left">
                    Với sự tập trung vào các bài học tương tác, sự chăm sóc cá
                    nhân và một chương trình học toàn diện, Trung tâm tiếng Anh
                    SPARKLE đứng như một điểm sáng về chất lượng giáo dục tiếng
                    Anh, giúp cá nhân phát triển xuất sắc cả trong học vấn và
                    công việc.
                  </p>
                </div>

                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4 no-wrap">
                  <h6 className="text-uppercase fw-bold mb-2">
                    Chăm sóc khách hàng
                  </h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>
                    <a href="#!" className="text-dark">
                      MDBootstrap
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">
                      MDWordPress
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">
                      BrandFlow
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">
                      Bootstrap Angular
                    </a>
                  </p>
                </div>

                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-2">
                    Luyện thi các khóa học
                  </h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>
                    <a href="#!" className="text-dark">
                      Luyện thi IETLS
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">
                      Luyện thi TOEIC
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">
                      Luyện thi PTE
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">
                      Luyện thi TOEFL
                    </a>
                  </p>
                </div>
                <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-2">Contact</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p className="text-left">
                    <i className="fas fa-home mr-3"></i>166/1/17 Quốc lộ 20,
                    phường Trung Mỹ Tây, Quận 12, TP.HCM
                  </p>
                  <p className="text-left">
                    <i className="fas fa-envelope mr-3"></i> info@example.com
                  </p>
                  <p className="text-left mb-6">
                    <i className="fas fa-phone mr-3"></i> 0974640100
                  </p>
                  <p className="text-left">Mã số doanh nghiệp: 0318073144</p>
                  <p className="text-left">Ngày cấp: 02/10/2023</p>
                  <p className="text-left">
                    Nơi cấp: Sở Kế Hoạch Đầu Tư Tp.HCM
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2024 Copyright:{" "}
            <a className="text-dark" href="#">
              anhngusparkle.edu.vn
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LayoutContainer;
