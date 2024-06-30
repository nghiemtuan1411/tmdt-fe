import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrderByUserId } from "../utils/api/order";
import moment from "moment";
import { convertCurrency } from "../utils/helpers/convertCurrency";

const TitleHeader = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
});

function MyOrder() {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const total = (listCart) => {
    return listCart?.cart?.reduce((totalPrice, item) => {
      const itemPrice =
        Number(item?.product?.discountPrice) * Number(item.amount);
      return totalPrice + itemPrice;
    }, 0);
  };

  useEffect(() => {
    if (!user?.username) return navigate("/");
    const getData = async () => {
      try {
        const res = await getOrderByUserId(user?._id);
        setData(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [user]);

  return (
    <MainLayout>
      <Container>
        <Box py={"40px"}>
          <Grid container spacing={2}>
            <Box
              component={Grid}
              item
              display={{ xs: "none", sm: "block" }}
              sm={2.4}
            >
              <TitleHeader>ĐƠN HÀNG</TitleHeader>
            </Box>
            <Grid item xs={3} sm={2.4}>
              <TitleHeader>NGÀY</TitleHeader>
            </Grid>
            <Grid item xs={3} sm={2.4}>
              <TitleHeader>TỔNG</TitleHeader>
            </Grid>
            <Grid item xs={3} sm={2.4}>
              <TitleHeader>TRẠNG THÁI</TitleHeader>
            </Grid>
            <Grid item xs={3} sm={2.4}>
              <TitleHeader>THAO TÁC</TitleHeader>
            </Grid>
          </Grid>
          <Box mt={1} width={"100%"} height={"2px"} bgcolor={"#ddd"} />
          {data?.map((e) => (
            <Box id={e?._id} mt={2}>
              <Grid container spacing={2}>
                <Box
                  component={Grid}
                  item
                  display={{ xs: "none", sm: "block" }}
                  sm={2.4}
                >
                  <Typography fontSize={14}>#{e?._id}</Typography>
                </Box>
                <Grid item xs={3} sm={2.4}>
                  <Typography fontSize={14}>
                    {moment(e?.createdAt).format("DD/MM/YYYY - HH:mm:ss")}
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={2.4}>
                  <Typography fontSize={14}>
                    {`${convertCurrency(total(e))}₫ (${
                      e?.cart?.length
                    } sản phẩm)`}
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={2.4}>
                  <Typography fontSize={14}>
                    {e?.isPayment == 2
                      ? "Đã thanh toán"
                      : "Thanh toán khi nhận hàng"}
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={2.4}>
                  <Typography fontSize={14}>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() => navigate(`/detail-order/${e?._id}`)}
                    >
                      Chi tiết
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
              <Box mt={2} width={"100%"} height={"1px"} bgcolor={"#ddd"} />
            </Box>
          ))}
        </Box>
      </Container>
    </MainLayout>
  );
}

export default MyOrder;
