import { Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import courseApi from "src/apis/courseApi";
import teacherApi from "src/apis/teacherApi";
import BoxContent from "src/components/BoxContent";
import FormControl from "src/components/FormControl";
import TextContent from "src/components/TextContent";
import { isPending, isSuccess } from "src/reducers";
import { notificationMessage } from "src/utils";

const Targets: React.FC = () => {
  const { id } = useParams();
  const [textList, setTextList] = useState<string[]>([]);
  const [slug, setSlug] = useState("");
  const dispatch = useDispatch();

  const handleAddText = () => {
    if (textList.length >= 5) {
      notificationMessage("error", "Tối đa 5 mục tiêu");
    } else {
      setTextList([...textList, ""]);
    }
  };
  const handleDeleteText = () => {
    if (textList.length === 1) {
      notificationMessage("error", "Tối thiểu 1 mục tiêu");
    } else {
      const newTextList = textList.slice(0, textList.length - 1);
      setTextList([...newTextList]);
    }
  };

  const handleSave = () => {
    dispatch(isPending());
    courseApi
      .updateCourse(slug, {
        targets: textList,
      })
      .then(() => {
        notificationMessage("success", "Cập nhật thông tin thành công");
        dispatch(isSuccess());
      });
  };

  useEffect(() => {
    dispatch(isPending());

    id &&
      teacherApi
        .getCourseDetails(id)
        .then((res: any) => {
          const { slug: _slugCourse, targets } = res.course;
          dispatch(isSuccess());
          setSlug(_slugCourse);
          setTextList(targets);
        })
        .catch(() => dispatch(isSuccess()));
  }, [id, dispatch]);

  return (
    <BoxContent.NormalContent>
      <TextContent.NormalText
        type="title-header-large"
        content="Mục tiêu khóa học"
      />
      <Divider />
      <BoxContent.NormalContent style={{ padding: 0 }}>
        {textList.map((text, index) => (
          <FormControl.Input
            key={index}
            required
            value={text}
            onChange={(e) => {
              const _value = (e.target as HTMLInputElement).value;
              setTextList(
                textList.map((textItem, i) => {
                  if (index === i) {
                    return _value;
                  }
                  return textItem;
                })
              );
            }}
            placeholder="A desire for a higher TOEIC score"
          />
        ))}
        <BoxContent.NormalContent
          flexDirectionType="row"
          style={{ width: "fit-content", gap: 10, padding: 0 }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              height: 45,
            }}
            onClick={handleAddText}
          >
            <TextContent.NormalText
              type="title-content"
              content="Thêm 1 dòng"
              style={{ marginLeft: "15px" }}
            />
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="error"
            sx={{
              height: 45,
            }}
            onClick={handleDeleteText}
          >
            <TextContent.NormalText
              type="title-content"
              content="Xóa 1 dòng"
              style={{ marginLeft: "15px" }}
            />
          </Button>
        </BoxContent.NormalContent>
      </BoxContent.NormalContent>
      <Button
        type="submit"
        variant="contained"
        color="success"
        sx={{
          height: 45,
          marginLeft: "auto",
        }}
        onClick={handleSave}
      >
        Lưu thông tin
      </Button>
    </BoxContent.NormalContent>
  );
};

export default Targets;
