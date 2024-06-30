import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  Container,
  Box,
  Grid,
  styled,
  Typography,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { convertCurrency } from "../utils/helpers/convertCurrency";
import { getOrderById } from "../utils/api/order";
import { useParams } from "react-router-dom";

const TitleHeader = styled(Typography)({
  fontSize: 14,
  fontWeight: 600,
});

function DetailOrder() {
  const [listCart, setListCart] = useState([]);
  const { id } = useParams();

  const isMoblie = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getOrderById(id);
        setListCart(res?.data?.cart);
      } catch (error) {}
    };
    getData();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <MainLayout>
      <Container>
        <Box
          py={"40px"}
          display={"flex"}
          gap={4}
          alignItems={"flex-start"}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          {!isMoblie ? (
            <Box flex={{ xs: 1, sm: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TitleHeader>SẢN PHẨM</TitleHeader>
                </Grid>
                <Grid item xs={2}>
                  <TitleHeader>GIÁ</TitleHeader>
                </Grid>
                <Grid item xs={2}>
                  <TitleHeader>SỐ LƯỢNG</TitleHeader>
                </Grid>
                <Grid item xs={2}>
                  <TitleHeader>THÀNH TIỀN</TitleHeader>
                </Grid>
              </Grid>
              <Box mt={1} width={"100%"} height={"2px"} bgcolor={"#ddd"} />
              {listCart?.map((e) => (
                <Box key={e?.product?._id + e?.type}>
                  <Grid container mt={1} spacing={2}>
                    <Grid item xs={6}>
                      <Box
                        display={"flex"}
                        gap={1}
                        alignItems={"center"}
                        sx={{ cursor: "pointer" }}
                      >
                        <Box
                          component={"img"}
                          src={e?.product?.img1}
                          display={"block"}
                          width={100}
                          height={100}
                          sx={{ objectFit: "cover", objectPosition: "center" }}
                        />
                        <Stack gap={0.5}>
                          <Typography
                            fontSize={12}
                            color={"#0F0F0F"}
                            fontWeight={600}
                          >
                            {e?.product?.name}
                          </Typography>
                          <Typography
                            fontSize={12}
                            color={"#dd3333"}
                            fontWeight={600}
                          >
                            {e?.type1} {e?.type2 && `- ${e?.type2}`}
                          </Typography>
                        </Stack>
                      </Box>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack justifyContent={"center"} height={"100%"}>
                        <Typography
                          color={"#dd3333"}
                          fontSize={14}
                          fontWeight={600}
                        >
                          {`${convertCurrency(e?.product?.discountPrice)}đ`}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack justifyContent={"center"} height={"100%"}>
                        <Typography fontSize={14} fontWeight={600}>
                          {e?.amount} cái
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack justifyContent={"center"} height={"100%"}>
                        <Typography
                          color={"#dd3333"}
                          fontSize={14}
                          fontWeight={600}
                        >
                          {`${convertCurrency(
                            Number(e?.amount) *
                              Number(e?.product?.discountPrice)
                          )}đ`}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Box mt={1} width={"100%"} height={"1px"} bgcolor={"#ddd"} />
                </Box>
              ))}
            </Box>
          ) : (
            <Box flex={{ xs: 1, sm: 2 }} width={"100%"}>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <TitleHeader>SẢN PHẨM</TitleHeader>
                </Grid>
                <Grid item xs={4}>
                  <TitleHeader>SỐ LƯỢNG</TitleHeader>
                </Grid>
              </Grid>
              <Box mt={1} width={"100%"} height={"2px"} bgcolor={"#ddd"} />
              {listCart?.map((e) => (
                <Box key={e?.product?._id + e?.type}>
                  <Grid container mt={1} spacing={1}>
                    <Grid item xs={8}>
                      <Box
                        display={"flex"}
                        gap={0.5}
                        alignItems={"center"}
                        sx={{ cursor: "pointer" }}
                      >
                        <Box
                          component={"img"}
                          src={e?.product?.img1}
                          display={"block"}
                          width={100}
                          height={100}
                          sx={{ objectFit: "cover", objectPosition: "center" }}
                        />
                        <Stack gap={"1px"}>
                          <Typography
                            fontSize={12}
                            color={"#0F0F0F"}
                            fontWeight={600}
                          >
                            {`${e?.product?.name} • ${e?.type}`}
                          </Typography>

                          <Typography
                            color={"#dd3333"}
                            fontSize={12}
                            fontWeight={600}
                            mt={1}
                          >
                            {`${e.amount} x ${convertCurrency(
                              e?.product?.discountPrice
                            )}₫`}
                          </Typography>
                        </Stack>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack justifyContent={"center"} height={"100%"}>
                        <Typography fontSize={14} fontWeight={600}>
                          {e?.amount} cái
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Box mt={1} width={"100%"} height={"1px"} bgcolor={"#ddd"} />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </MainLayout>
  );
}

export default DetailOrder;
