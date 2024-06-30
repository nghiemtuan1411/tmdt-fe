import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Box, Container, Typography, styled } from "@mui/material";
import { create, loginAccount } from "../utils/api/user";
import { notify } from "../utils/helpers/notify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../utils/redux/userSlice";
import { useNavigate } from "react-router-dom";
import { InputText } from "../components/common/InputText";

const ButtonAuth = styled("button")({
  border: "none",
  background: "#dd3333",
  fontSize: 16,
  color: "white",
  fontWeight: 600,
  transition: "all .3s ease",
  padding: "10px 20px",

  "&:hover": {
    boxShadow: "inset 0 0 0 100px rgba(0,0,0,.2)",
  },
});

function Auth() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

  const handleReset = () => {
    setUsername("");
    setUserName("");
    setName("");
    setPassword("");
    setPassWord("");
    setPhone("");
    setAddress("");
    setEmail("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await create({
        name,
        username,
        password,
        phone,
        address,
        email,
      });
      if (res.data?.status === 400) {
        notify("error", res?.data?.message);
      } else {
        notify("success", "Đăng kí tài khoản thành công");
        handleReset();
      }
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAccount({
        username: userName,
        password: passWord,
      });
      if (res.data?.status === 400) {
        notify("error", res?.data?.message);
      } else {
        dispatch(login(res.data));
        notify("success", "Đăng nhập thành công");
        handleReset();
      }
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  useEffect(() => {
    user?._id && navigate("/");
  }, [user]);

  return (
    <MainLayout>
      <Container>
        <Box py={"40px"}>
          <Box
            display={"flex"}
            gap={8}
            alignItems={"flex-start"}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Box
              flex={1}
              component={"form"}
              onSubmit={handleLogin}
              width={"100%"}
            >
              <Typography color={"#dd3333"} fontSize={"20px"} fontWeight={600}>
                ĐĂNG NHẬP
              </Typography>
              <Box mt={"20px"}>
                <Box>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Tên tài khoản *
                  </Typography>
                  <InputText
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Box>

                <Box mt={"20px"}>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Mật khẩu *
                  </Typography>
                  <InputText
                    type="password"
                    required
                    value={passWord}
                    onChange={(e) => setPassWord(e.target.value)}
                  />
                </Box>
              </Box>
              <Box mt={"20px"}>
                <ButtonAuth type="submit">ĐĂNG NHẬP</ButtonAuth>
              </Box>
              <Typography
                mt={2}
                sx={{ cursor: "pointer", "&:hover": { color: "#dd3333" } }}
                onClick={() => navigate("/lost-password")}
              >
                Quên mật khẩu ?
              </Typography>
            </Box>
            <Box
              width={"1px"}
              bgcolor={"#ececec"}
              height={300}
              display={{ xs: "none", sm: "block" }}
            />
            <Box
              flex={1}
              component={"form"}
              onSubmit={handleRegister}
              width={"100%"}
            >
              <Typography color={"#dd3333"} fontSize={"20px"} fontWeight={600}>
                ĐĂNG KÝ
              </Typography>
              <Box mt={"20px"}>
                <Box>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Họ tên *
                  </Typography>
                  <InputText
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Box mt={"20px"}>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Tên tài khoản *
                  </Typography>
                  <InputText
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Box>
                <Box mt={"20px"}>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Email *
                  </Typography>
                  <InputText
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
                <Box mt={"20px"}>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Mật khẩu *
                  </Typography>
                  <InputText
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>
                <Box mt={"20px"}>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Số điện thoại
                  </Typography>
                  <InputText
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Box>
                <Box mt={"20px"}>
                  <Typography
                    color={"#222"}
                    fontWeight={500}
                    fontSize={14}
                    mb={"4px"}
                  >
                    Địa chỉ
                  </Typography>
                  <InputText
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Box>
                <Box mt={"20px"}>
                  <ButtonAuth type="submit">ĐĂNG KÍ</ButtonAuth>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default Auth;
