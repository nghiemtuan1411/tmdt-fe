import React, { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Box, Container, Typography } from "@mui/material";

function Promotion() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <MainLayout>
      <Container>
        <Box py={"40px"}>
          <Typography fontSize={36} color={"#0A0A0A"} fontWeight={600}>
            Chính sách ưu đãi
          </Typography>
          <Typography mt={1}>
            Website sẽ luôn có các chương trình ưu đãi theo từng thời điểm, với
            mỗi đơn đặt hàng tại website sẽ được khuyến mãi 10% trực tiếp (giá
            đã được giảm tại website: tmdt.com)
          </Typography>
          <Box pl={1} mt={1}>
            <Typography fontWeight={600}>
              • Đặc biệt, giảm thêm 5% với mỗi một lần giới thiệu, Quý khách
              hàng sẽ tiếp tục nhận thêm các voucher giảm +5%, +10%, +15% và
              thậm chí là 20% cho khách hàng giới thiệu lần thứ 5. Điều đó có
              nghĩa là sau khi giới thiệu được 5KH thì mọi hoá đơn sau này tại
              WEBSITE bạn đều được giảm giá 20%
            </Typography>
          </Box>
          <Typography mt={1} color={"#dd3333"} fontWeight={600}>
            Quý khách hãy nhớ chấp nhận kết bạn từ tài khoản Zalo: TMDT để cập
            nhật chương trình ưu đãi rành riêng cho mình nhé
          </Typography>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default Promotion;
