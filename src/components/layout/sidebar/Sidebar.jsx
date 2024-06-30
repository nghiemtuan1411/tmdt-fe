import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BiCategory } from "react-icons/bi";
import { RiProductHuntLine, RiUserLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";

export const Sidebar = (
  <React.Fragment>
    <ListItemButton href="/">
      <ListItemIcon>
        <IoHomeOutline fontSize={24} />
      </ListItemIcon>
      <ListItemText primary="Trang chủ" />
    </ListItemButton>
    <ListItemButton href="/admin/user">
      <ListItemIcon>
        <RiUserLine fontSize={24} />
      </ListItemIcon>
      <ListItemText primary="Người dùng" />
    </ListItemButton>
    <ListItemButton href="/admin/category">
      <ListItemIcon>
        <BiCategory fontSize={24} />
      </ListItemIcon>
      <ListItemText primary="Danh mục" />
    </ListItemButton>
    <ListItemButton href="/admin/order">
      <ListItemIcon>
        <IoIosInformationCircleOutline fontSize={24} />
      </ListItemIcon>
      <ListItemText primary="Đơn hàng" />
    </ListItemButton>
    <ListItemButton href="/admin/product">
      <ListItemIcon>
        <RiProductHuntLine fontSize={24} />
      </ListItemIcon>
      <ListItemText primary="Sản phẩm" />
    </ListItemButton>
  </React.Fragment>
);
