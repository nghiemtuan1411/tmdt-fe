import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import { DataGrid } from "@mui/x-data-grid";
import { convertCurrency } from "../../../../utils/helpers/convertCurrency";

function ModalDetailOrder({ open, handleClose, info }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);

  const columns = [
    {
      field: "product.img1",
      headerName: "Hình ảnh",
      width: 180,
      renderCell: (params) => (
        <Box
          component={"img"}
          src={params?.row?.product?.img1 || "/img/noImage.jpg"}
          width={120}
          height={120}
          sx={{ objectFit: "cover", borderRadius: 2, border: "1px solid #ddd" }}
        />
      ),
    },
    {
      field: "product.name",
      headerName: "Tên sản phẩm",
      width: 180,
      renderCell: (params) => <>{params?.row?.product?.name}</>,
    },
    { field: "type1", headerName: "Phân loại 1", width: 150 },
    { field: "type2", headerName: "Phân loại 2", width: 150 },

    {
      field: "product.discountPrice",
      headerName: "Giá",
      width: 150,
      renderCell: (params) => (
        <Typography variant="subtitle2" fontWeight={600}>
          {convertCurrency(params?.row?.product?.discountPrice)}
        </Typography>
      ),
    },

    { field: "amount", headerName: "Số lượng", width: 150 },
    {
      field: "total",
      headerName: "Thành tiền",
      width: 150,
      renderCell: (params) => (
        <Typography variant="subtitle2" fontWeight={600} color={"#dd3333"}>
          {convertCurrency(
            Number(params?.row?.amount) *
              Number(params?.row?.product?.discountPrice)
          )}
        </Typography>
      ),
    },
  ];

  useEffect(() => {
    setData(info?.cart?.map((e) => ({ id: e?._id, ...e })));
    const result = () => {
      return info?.cart?.reduce((totalPrice, item) => {
        const itemPrice =
          Number(item?.product?.discountPrice) * Number(item.amount);
        return totalPrice + itemPrice;
      }, 0);
    };
    setTotal(result);
  }, [info]);

  return (
    <ModalUpdate
      open={open}
      title={"Chi tiết đơn hàng"}
      handleClose={handleClose}
      handleOk={handleClose}
      maxWidth={"lg"}
      showCancel={false}
      titleOk={"Đóng"}
    >
      <Grid container spacing={2}>
        {data?.length > 0 && (
          <DataGrid
            rowHeight={150}
            disableRowSelectionOnClick
            rows={data}
            columns={columns}
            hideFooter
          />
        )}
      </Grid>
      <Box mt={2} display={"flex"} justifyContent={"center"} gap={1}>
        <Typography fontWeight={600} variant="subtitle1">
          Tổng hóa đơn:
        </Typography>
        <Typography fontWeight={600} variant="subtitle1" color={"#dd3333"}>
          {convertCurrency(total)}
        </Typography>
      </Box>
    </ModalUpdate>
  );
}

export default ModalDetailOrder;
