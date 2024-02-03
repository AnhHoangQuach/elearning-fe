import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import cartApi from "src/apis/cartApi";
import LoadingContent from "src/components/LoadingContent";
import { getTotalCart, selectAuthorization } from "src/reducers";

interface BtnAddCartProps {
  courseId?: string;
  isBought?: boolean;
}

const BtnAddCart: React.FC<BtnAddCartProps> = ({ courseId, isBought }) => {
  const { isAuth, isRole } = useSelector(selectAuthorization);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCart = async () => {
    if (!isAuth) {
      navigate("/login");
    } else {
      const params = { course: courseId };
      // console.log("params", params);
      setIsLoading(true);
      try {
        const response = await cartApi.addItemToCart(params);
        const { carts }: any = response;
        // console.log("carts", carts.length);
        dispatch(getTotalCart(carts.length));

        setIsLoading(false);
        toast.success("Thêm vào giỏ hàng thành công", {
          position: "bottom-right",
        });
      } catch (error) {
        console.log("lỗi rồi", { error });
        setIsLoading(false);
        toast.warning(`${error}`, {
          position: "bottom-right",
        });
      }
    }
  };

  if (isBought) {
    return (
      <Button variant="contained" color="warning" disabled>
        Bạn đã sở hữu khoá này
      </Button>
    );
  }
  if (isRole !== "student" && isRole !== "") {
    return (
      <Button variant="contained" color="warning" disabled>
        Học sinh mới được mua
      </Button>
    );
  }
  return (
    <Button
      variant="contained"
      color="warning"
      onClick={handleAddCart}
      disabled={isLoading}
    >
      {!isLoading ? "Mua khoá học ngay" : <LoadingContent.Loading />}
    </Button>
  );
};
export default BtnAddCart;
