import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { convertCurrency } from "../utils/helpers/convertCurrency";
import { create } from "../utils/api/order";
import { notify } from "../utils/helpers/notify";
import { resetCart } from "../utils/redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";

const InputText = styled("input")({
  outline: "none",
  border: "1px solid #ddd",
  boxShadow: "inset 0 1px 2px rgba(0,0,0,.1)",
  boxSizing: "border-box",
  color: "#333",
  height: "2.507em",
  width: "100%",
  padding: "0 0.75em",
  fontSize: "0.97em",

  "&:focus": {
    boxShadow: "0 0 5px #ccc",
  },
});

const TextArea = styled("textarea")({
  outline: "none",
  border: "1px solid #ddd",
  boxShadow: "inset 0 1px 2px rgba(0,0,0,.1)",
  boxSizing: "border-box",
  color: "#333",
  width: "100%",
  padding: "0.75em 0.75em",
  fontSize: "0.97em",
  resize: "none",

  "&:focus": {
    boxShadow: "0 0 5px #ccc",
  },
});

const Button = styled("button")({
  border: "none",
  background: "#dd3333",
  fontSize: 16,
  color: "white",
  fontWeight: 600,
  transition: "all .3s ease",
  width: "100%",
  padding: "10px 0",
  "&:hover": {
    boxShadow: "inset 0 0 0 100px rgba(0,0,0,.2)",
  },
});

function Checkout() {
  const cart = useSelector((state) => state?.cart?.cart);
  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [total, setTotal] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCheckout = async (isPayment) => {
    setLoading(true);
    try {
      const payload = {
        name,
        phone,
        address,
        note,
        isPayment: Number(isPayment),
        ...(user && { user }),
        cart: cart,
      };
      await create(payload);
      notify("success", "Đặt hàng thành công");
      dispatch(resetCart());
      navigate("/");
      handleReset();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setAddress("");
    setNote("");
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = 0;

      cart?.forEach((item) => {
        totalPrice += Number(item.info?.discountPrice) * Number(item.amount);
      });

      setTotal(totalPrice);
    };
    calculateTotalPrice();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [cart]);

  return (
    <MainLayout>
      <Container>
        <Box py={"20px"}>
          <Grid
            container
            spacing={4}
            component={"form"}
            onSubmit={handleCheckout}
          >
            <Grid item xs={12} sm={7}>
              <Typography fontSize={18} color={"#dd3333"} fontWeight={600}>
                THÔNG TIN THANH TOÁN
              </Typography>
              <Box mt={2}>
                <InputText
                  placeholder="Nhập họ và tên người nhận hàng"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Grid container mt={{ xs: 0, sm: 1 }} spacing={1}>
                <Grid item xs={12} sm={6}>
                  <InputText
                    placeholder="Nhập số điện thoại người nhận hàng"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputText
                    placeholder="Nhập địa chỉ nhận hàng"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container mt={1}>
                <Grid item xs={12}>
                  <TextArea
                    rows={5}
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay địa chỉ dẫn địa điểm giao hàng chi tiết hơn"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Box
                padding={"30px"}
                bgcolor={"rgba(0,0,0,.02)"}
                boxShadow={
                  "1px 1px 3px 0 rgba(0,0,0,.2), 0 1px 0 rgba(0,0,0,.07), inset 0 0 0 1px rgba(0,0,0,.05)"
                }
              >
                <Typography color={"#dd3333"} fontSize={18} fontWeight={600}>
                  ĐƠN HÀNG CỦA BẠN
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mt={2}
                >
                  <Typography fontSize={14} color={"#0A0A0A"} fontWeight={600}>
                    SẢN PHẨM
                  </Typography>
                  <Typography fontSize={14} color={"#0A0A0A"} fontWeight={600}>
                    TẠM TÍNH
                  </Typography>
                </Box>
                <Box mt={1} height={"2px"} width={"100%"} bgcolor={"#ddd"} />
                {cart?.map((e, index) => (
                  <Box
                    key={index}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    gap={2}
                    paddingY={"10px"}
                  >
                    <Typography fontSize={12} color={"#0A0A0A"}>
                      {e?.info?.name} {e?.type && "-"} {e?.type} × {e?.amount}
                    </Typography>
                    <Typography
                      fontSize={12}
                      color={"#dd3333"}
                      fontWeight={600}
                    >
                      {`${convertCurrency(
                        e?.info?.discountPrice * e?.amount
                      )}₫`}
                    </Typography>
                  </Box>
                ))}

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={2}
                  paddingY={"10px"}
                >
                  <Typography
                    fontSize={12}
                    color={"#0A0A0A"}
                    fontWeight={"bold"}
                  >
                    Tạm tính
                  </Typography>
                  <Typography fontSize={12} color={"#dd3333"} fontWeight={600}>
                    {`${convertCurrency(total)}₫`}
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={2}
                  paddingY={"10px"}
                >
                  <Typography
                    fontSize={12}
                    color={"#0A0A0A"}
                    fontWeight={"bold"}
                  >
                    Giao hàng
                  </Typography>
                  <Typography fontSize={12} color={"#0A0A0A"}>
                    Báo giá sau
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={2}
                  paddingY={"10px"}
                >
                  <Typography
                    fontSize={12}
                    color={"#0A0A0A"}
                    fontWeight={"bold"}
                  >
                    Tổng
                  </Typography>
                  <Typography fontSize={12} color={"#dd3333"} fontWeight={600}>
                    {`${convertCurrency(total)}₫`}
                  </Typography>
                </Box>
                <Box mt={1} height={"2px"} width={"100%"} bgcolor={"#ddd"} />
                <Box paddingY={"10px"}>
                  <Typography
                    fontSize={14}
                    color={"#0A0A0A"}
                    fontWeight={"bold"}
                  >
                    THANH TOÁN KHI NHẬN HÀNG (COD)
                  </Typography>
                  <Typography mt={1} fontSize={14} color={"#0A0A0A"}>
                    Nhập địa chỉ chính xác để nhận hàng nhé!
                  </Typography>
                </Box>
                {cart?.length > 0 && (
                  <Box>
                    {loading ? (
                      <Box display={"flex"} justifyContent={"center"}>
                        <CircularProgress color="error" />
                      </Box>
                    ) : (
                      <Stack gap={2}>
                        <PayPalButton
                          amount={(Number(total) / 23000).toFixed(2)}
                          currency={"USD"}
                          onSuccess={(details, data) => {
                            handleCheckout(2);
                          }}
                        />
                        <Button
                          onClick={() => {
                            handleCheckout(1);
                          }}
                        >
                          Thanh toán khi nhận hàng
                        </Button>
                      </Stack>
                    )}
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default Checkout;
