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
      {showSupportItems && <div className="support-items">ádasdasd</div>}
      <div className="body-container">{children}</div>
      {footerShow && <Footer />}
    </div>
  );
};

export default LayoutContainer;
