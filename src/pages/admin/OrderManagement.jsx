import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AuthLayout";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { listOrder } from "../../utils/api/order";
import moment from "moment";
import ModalDetailOrder from "../../components/screens/admin/order/ModalDetailOrder";

function OrderManagement() {
  const [data, setData] = useState([]);
  const [infoUpdate, setInfoUpdate] = useState({});
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const columns = [
    { field: "name", headerName: "Tên ", width: 150 },
    { field: "address", headerName: "Địa chỉ", width: 150 },
    { field: "phone", headerName: "Số điện thoại", width: 150 },
    {
      field: "isPayment",
      headerName: "Trạng thái",
      width: 250,
      renderCell: (params) => {
        return params?.row?.isPayment == 2
          ? "Đã thanh toán"
          : "Thanh toán khi nhận hàng";
      },
    },
    { field: "note", headerName: "Ghi chú", width: 200 },
    {
      field: "createdAt",
      headerName: "Thời gian đặt",
      width: 200,
      renderCell: (params) => {
        return moment(params?.row?.createdAt).format("DD/MM/YYYY - HH:mm:ss");
      },
    },
    {
      field: "",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => (
        <Box display={"flex"} gap={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleOpenConfirmUpdate(params.row)}
          >
            Chi tiết đơn hàng
          </Button>
        </Box>
      ),
    },
  ];

  const getListOrder = async () => {
    try {
      const res = await listOrder();
      console.log(res);
      setData(res.data?.map((e) => ({ id: e._id, ...e })));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenConfirmUpdate = (data) => {
    setInfoUpdate(data);
    setIsOpenUpdate(true);
  };

  useEffect(() => {
    getListOrder();
  }, []);

  return (
    <AdminLayout>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={20}>
          Thông tin đơn hàng
        </Typography>
      </Box>
      <Box mt={4} height={"70vh"}>
        <DataGrid disableRowSelectionOnClick rows={data} columns={columns} />
      </Box>

      <ModalDetailOrder
        open={isOpenUpdate}
        handleClose={() => setIsOpenUpdate(false)}
        info={infoUpdate}
      />
    </AdminLayout>
  );
}

export default OrderManagement;
