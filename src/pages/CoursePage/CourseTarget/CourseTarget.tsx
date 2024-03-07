import React from "react";
import "./CourseTarget.scss";

interface CourseTargetProps {
  title?: string;
  content?: string[];
  isLoading?: boolean;
}

const CourseTarget: React.FC<CourseTargetProps> = ({
  title = "Chưa có title",
  content = [],
  isLoading = false,
}) => {
  // console.log(isLoading);

  const renderContent = (content: string[]) => {
    if (content.length > 0) {
      return content.map((target, index) => (
        <span key={index}>- {target}</span>
      ));
    }
    return (
      <div className="none-content">
        Hiện tại chưa có thông tin nào để hiển thị
      </div>
    );
  };

  return (
    <div className="course-target">
      <span className="title-target">{title}</span>
      <div className="content-target">
        {!isLoading ? (
          renderContent(content)
        ) : (
            <></>
        )}
      </div>
    </div>
  );
};

export default CourseTarget;
