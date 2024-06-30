import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LeftProduct from "../components/screens/product/LeftProduct";
import RightProduct from "../components/screens/product/RightProduct";
import ProductCard from "../components/common/ProductCard";
import { useParams } from "react-router-dom";
import { getProductById, listRelatedVideo } from "../utils/api/product";
import { useSelector } from "react-redux";
import { create, getCommentById } from "../utils/api/comment";
import moment from "moment";

function Product() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [arrRelatedVideo, setArrRelatedVideo] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const [listComment, setListComment] = useState([]);

  const handleComment = async () => {
    try {
      if (!content) return;
      const res = await create({
        content,
        product: id,
        user: user._id,
      });
      setContent("");
      setListComment([res?.data, ...listComment]);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          getProductById(id).then((res) => {
            setData(res?.data);
          }),
          listRelatedVideo(id).then((res) => {
            setArrRelatedVideo(res?.data);
          }),
          getCommentById(id).then((res) => {
            setListComment(res?.data);
          }),
        ]);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  return (
    <MainLayout>
      <Container>
        <Stack py={"20px"} gap={"40px"}>
          {loading ? (
            <Box
              height={"70vh"}
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CircularProgress color="error" />
            </Box>
          ) : (
            <Box>
              <Paper elevation={3}>
                <Box
                  paddingX={"10px"}
                  paddingTop={"10px"}
                  paddingBottom={"40px"}
                >
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={5}>
                      <LeftProduct
                        data={[
                          data?.img1,
                          data?.img2,
                          data?.img3,
                          data?.img4,
                          data?.img5,
                          data?.img6,
                          data?.img7,
                          data?.img8,
                          data?.img9,
                          data?.img10,
                          data?.firstTypeUrl1,
                          data?.firstTypeUrl2,
                          data?.firstTypeUrl3,
                          data?.firstTypeUrl4,
                          data?.firstTypeUrl5,
                          data?.firstTypeUrl6,
                          data?.firstTypeUrl7,
                          data?.firstTypeUrl8,
                          data?.firstTypeUrl9,
                          data?.firstTypeUrl10,
                          data?.secondTypeUrl1,
                          data?.secondTypeUrl2,
                          data?.secondTypeUrl3,
                          data?.secondTypeUrl4,
                          data?.secondTypeUrl5,
                          data?.secondTypeUrl6,
                          data?.secondTypeUrl7,
                          data?.secondTypeUrl8,
                          data?.secondTypeUrl9,
                          data?.secondTypeUrl10,
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <RightProduct info={data} />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
              <Paper elevation={3}>
                <Box padding={"10px"} mt={2}>
                  <Typography fontSize={20} color={"#dd3333"} fontWeight={600}>
                    BÌNH LUẬN SẢN PHẨM
                  </Typography>
                  <Box mt={"20px"} p={"10px"}>
                    {!user?.username ? (
                      <Box
                        display={"flex"}
                        flexDirection={{ xs: "column", md: "row" }}
                        gap={2}
                        alignItems={"center"}
                        justifyContent={"center"}
                        textAlign={"center"}
                      >
                        <Typography>
                          Bạn cần phải đăng nhập để bình luận sản phẩm
                        </Typography>
                        <Button variant="contained" href="/auth" size="small">
                          Đăng nhập
                        </Button>
                      </Box>
                    ) : (
                      <Box>
                        <Box display={"flex"} gap={2} alignItems={"flex-end"}>
                          <Typography fontWeight={600} fontSize={14}>
                            {user?.username}
                          </Typography>
                        </Box>

                        <Box
                          mt={1}
                          display={"flex"}
                          justifyContent={"space-between"}
                          gap={2}
                        >
                          <TextField
                            size="small"
                            variant="standard"
                            fullWidth
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                          />
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ whiteSpace: "nowrap" }}
                            onClick={handleComment}
                          >
                            Bình luận
                          </Button>
                        </Box>
                      </Box>
                    )}

                    <Box mt={4}>
                      <Typography fontWeight={600}>
                        Danh sách bình luận
                      </Typography>
                      {listComment?.map((cm) => (
                        <Box mt={1} key={cm._id}>
                          <Box>
                            <Box
                              display={"flex"}
                              gap={2}
                              alignItems={"flex-end"}
                            >
                              <Typography fontWeight={600} fontSize={14}>
                                {cm.user.username}
                              </Typography>
                              <Typography fontSize={12}>
                                {moment(cm?.createdAt).format(
                                  "DD/MM/YYYY - HH:mm:ss"
                                )}
                              </Typography>
                            </Box>
                            <Box
                              mt={1}
                              display={"flex"}
                              justifyContent={"space-between"}
                              gap={2}
                            >
                              <Typography>{cm.content}</Typography>
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Paper>
              <Paper elevation={3}>
                <Box padding={"10px"} mt={2}>
                  <Typography fontSize={20} color={"#dd3333"} fontWeight={600}>
                    SẢN PHẨM TƯƠNG TỰ
                  </Typography>
                  <Box mt={"20px"}>
                    <Grid container spacing={2}>
                      {arrRelatedVideo.map((e) => (
                        <Grid item xs={6} md={2} key={e?._id}>
                          <ProductCard item={e} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </Box>
          )}
        </Stack>
      </Container>
    </MainLayout>
  );
}

export default Product;
