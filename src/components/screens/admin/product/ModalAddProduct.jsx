import React, { useState } from "react";
import { Typography, TextField, Grid } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import { create } from "../../../../utils/api/product";
import { notify } from "../../../../utils/helpers/notify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../utils/firebase";
import ImgUpload from "./ImgUpload";

function ModalAddProduct({ open, handleClose, reloadData }) {
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [struct, setStruct] = useState("");
  const [nameFirstType, setNameFirstType] = useState("");
  const [firstType, setFirstType] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");

  const images = [
    { src: img1, setSrc: setImg1 },
    { src: img2, setSrc: setImg2 },
    { src: img3, setSrc: setImg3 },
    { src: img4, setSrc: setImg4 },
  ];

  const setterImgFunctions = [setImg1, setImg2, setImg3, setImg4];

  const setImgByIndex = (setterFunc, index, url) => {
    const setter = setterFunc[index - 1];
    if (setter) {
      setter(url);
    }
  };

  const handleReset = () => {
    handleClose();
    setName("");
    setLabel("");
    setDiscountPrice("");
    setPrice("");
    setDescription("");
    setStruct("");
    setImg1("");
    setImg2("");
    setImg3("");
    setImg4("");
    setNameFirstType("");
    setFirstType("");
  };

  const handleAddProduct = async () => {
    try {
      await create({
        name,
        label,
        price: Number(price),
        discountPrice: Number(discountPrice),
        description,
        struct,
        img1,
        img2,
        img3,
        img4,
        nameFirstType,
        firstType: firstType?.split(","),
      });
      notify("success", "Thêm sản phẩm thành công");
      reloadData();
    } catch (error) {}
    handleReset();
  };

  function handleUploadImg(event, index, lstFunc) {
    const file = event.target.files[0];
    const storageRef = ref(storage, `/files/${file.name + Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgByIndex(lstFunc, index, url);
        });
      }
    );
    event.target.value = null;
  }

  return (
    <ModalUpdate
      open={open}
      title={"Thêm sản phẩm"}
      maxWidth={"lg"}
      handleClose={handleReset}
      handleOk={handleAddProduct}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography>Tên sản phẩm:</Typography>
          <TextField
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography>Nhãn:</Typography>
          <TextField
            fullWidth
            size="small"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography>Giá gốc:</Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography>Giá khuyến mại:</Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </Grid>

        {images.map((img, index) => (
          <ImgUpload
            name={"Ảnh"}
            key={index}
            img={img.src}
            handleUploadImg={(e) =>
              handleUploadImg(e, index + 1, setterImgFunctions)
            }
            setImg={img.setSrc}
            index={index + 1}
          />
        ))}

        <Grid item xs={6}>
          <Typography>Mô tả:</Typography>
          <TextField
            fullWidth
            size="small"
            multiline
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Thông số sản phẩm:</Typography>
          <TextField
            fullWidth
            size="small"
            multiline
            rows={8}
            value={struct}
            onChange={(e) => setStruct(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Tên phân loại :</Typography>
          <TextField
            fullWidth
            size="small"
            value={nameFirstType}
            onChange={(e) => setNameFirstType(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Thêm loại : (ngăn cách nhau bởi dấu ,)</Typography>
          <TextField
            fullWidth
            size="small"
            value={firstType}
            onChange={(e) => setFirstType(e.target.value)}
          />
        </Grid>
      </Grid>
    </ModalUpdate>
  );
}

export default ModalAddProduct;
