import React, { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Box, Container, Typography } from "@mui/material";

function Guarantee() {
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
            Chính sách bảo hành
          </Typography>
          <Typography mt={2.5} fontSize={26} fontWeight={600} color={"#0A0A0A"}>
            1. Chính sách của chúng tôi
          </Typography>
          <Typography mt={1}>
            <strong>- Trong vòng 7 ngày đầu </strong> sau khi mua hàng, sản phẩm
            bị lỗi sẽ được đổi mới 100%.
          </Typography>
          <Typography mt={1}>
            <strong>- Trường hợp không bảo hành được</strong> hoặc thời gian bảo
            hành quá lâu (trên 7 ngày) Quý khách có thể lựa chọn một trong các
            phương án sau:
          </Typography>
          <Box pl={2} mt={1}>
            <Typography>
              • Đổi sang sản phẩm khác tương đương với sản phẩm bảo hành.
            </Typography>
            <Typography mt={1}>
              • Nhập lại sản phẩm theo giá thỏa thuận (giá nhập lại sản phẩm
              được tính dựa trên: tình trạng vật lý của sản phẩm và khấu hao
              thời gian sử dụng).
            </Typography>
          </Box>
          <Typography mt={1} color={"#dd3333"}>
            <strong>- Lưu ý: </strong>
          </Typography>
          <Box pl={2} mt={1}>
            <Typography>
              • Chính sách đổi và nhập lại chỉ áp dụng với sản phẩm bị lỗi do
              hãng sản xuất và đủ điều kiện bảo hành.
            </Typography>
          </Box>
          <Typography mt={2.5} fontSize={26} fontWeight={600} color={"#0A0A0A"}>
            2. Điều kiện bảo hành
          </Typography>
          <Typography mt={1} fontWeight={600}>
            KHÔNG CHẤP NHẬN BẢO HÀNH VỚI CÁC TRƯỜNG HỢP SAU
          </Typography>
          <Typography mt={1}>
            Tất cả các sản phẩm do Website bán ra đều tuân thủ điều kiện bảo
            hành của nhà cung cấp, của hãng sản xuất. Các trường hợp sau đây bị
            coi là vi phạm điều kiện bảo hành và không được bảo hành:
          </Typography>
          <Box pl={1} mt={1}>
            <Typography fontWeight={600}>
              1. Sản phẩm bị tiêu hao trong quá trình sử dụng.
            </Typography>
            <Typography fontWeight={600} mt={1}>
              2. Sản phẩm hết thời hạn bảo hành.
            </Typography>
            <Typography fontWeight={600} mt={1}>
              3. Sản phẩm trong chương trình giảm giá sốc (Website sẽ thông báo
              trước cho quý khách)
            </Typography>
            <Typography fontWeight={600} mt={1}>
              4. Sản phẩm bị lỗi do ngoại cảnh (ngập nước, bị ảnh hưởng bởi
              nhiệt độ…).
            </Typography>
            <Typography fontWeight={600} mt={1}>
              5. Sản phẩm có những tình trạng như sau:
            </Typography>
            <Box pl={1} mt={1}>
              <Typography fontWeight={550}>
                <i>
                  • Sản phẩm bị biến dạng vật lý như trầy, xước, lồi, lõm,
                  rách...
                </i>
              </Typography>
              <Typography fontWeight={550} mt={1}>
                <i>
                  • Sản phẩm bị mốc, hoen rỉ, ẩm ướt, chất lỏng xâm nhập, ố
                  vàng, mờ chữ...
                </i>
              </Typography>
              <Typography fontWeight={550} mt={1}>
                <i>
                  • Sản phẩm thiếu vỏ hộp, phụ kiện, …đối với các sản phẩm hãng
                  sản xuất, nhà cung cấp yêu cầu.
                </i>
              </Typography>
            </Box>
            <Typography fontWeight={600} mt={1}></Typography>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default Guarantee;
