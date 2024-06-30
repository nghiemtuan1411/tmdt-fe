import { Box, Container, Stack, Typography, styled } from "@mui/material";
import React from "react";
import { socialIcon } from "../../../contstant/socialIcon";
import SocialIcon from "../../common/SocailIcon";
import { useNavigate } from "react-router-dom";

const Title = styled(Typography)({
  color: "white",
  fontSize: 24,
  fontWeight: 600,
});

const Item = styled(Typography)({
  color: "white",
  fontSize: 14,
  fontWeight: 500,
});

const SupportItem = styled(Typography)({
  color: "white",
  fontSize: 16,
  cursor: "pointer",
  transition: "all .3s ease",
  textDecoration: "underline",
  "&:hover": {
    color: "#dd3333",
  },
});

function Footer() {
  const navigate = useNavigate();

  return (
    <Box bgcolor={"black"} paddingY={"4rem"}>
      <Container>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={{ xs: "column", sm: "row" }}
          gap={4}
        >
          <Box flex={1}>
            <Title>Thông tin liên hệ</Title>
            <Stack gap={2} mt={2}>
              <Item>- Thời gian làm việc: 9:00 - 21:00</Item>
              <Item>- Điện thoại / Zalo: 0368408021</Item>
              <Item>- Email: nghiemtuan1411@gmail.com</Item>
            </Stack>
          </Box>
          <Box flex={1}>
            <Title>Thông tin hỗ trợ</Title>
            <Stack gap={2} mt={2}>
              <SupportItem onClick={() => navigate("/transport")}>
                Chính sách vận chuyển
              </SupportItem>
              <SupportItem onClick={() => navigate("/guarantee")}>
                Chính sách bảo hành
              </SupportItem>
              <SupportItem onClick={() => navigate("/promotion")}>
                Chính sách ưu đãi
              </SupportItem>
              <Box display={"flex"} sx={{ cursor: "pointer" }} gap={2}>
                {socialIcon.map((social, index) => (
                  <SocialIcon
                    key={index}
                    icon={social.icon}
                    title={social.title}
                  />
                ))}
              </Box>
            </Stack>
          </Box>
          <Stack
            flex={1}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            <Item>
              Website là nơi kinh doanh các sản phẩm về quần áo nam, từ áo sơ
              mi, áo thun, quần jeans đến phụ kiện thời trang nam, sản phẩm đa
              dạng cho bạn lựa chọn.
            </Item>
            <Box
              mt={1}
              component={"img"}
              src={"/img/common/Dmca.png"}
              display={"block"}
              sx={{ objectFit: "contain" }}
              height={30}
              alignItems={"flex-start"}
            />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
