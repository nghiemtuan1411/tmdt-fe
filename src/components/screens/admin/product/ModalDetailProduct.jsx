import React, { useEffect, useState } from "react";
import { Typography, TextField, Grid } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import { updateProduct } from "../../../../utils/api/product";
import { notify } from "../../../../utils/helpers/notify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../utils/firebase";
import ImgUpload from "./ImgUpload";

function ModalDetailProduct({ open, handleClose, reloadData, info }) {
  const [id, setId] = useState("");
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

  const handleUpdateProduct = async () => {
    try {
      await updateProduct(id, {
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
      notify("success", "Cập nhật sản phẩm thành công");
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

  useEffect(() => {
    setId(info?._id);
    setName(info?.name);
    setLabel(info?.label);
    setPrice(info?.price);
    setDiscountPrice(info?.discountPrice);
    setImg1(info?.img1);
    setImg2(info?.img2);
    setImg3(info?.img3);
    setImg4(info?.img4);
    setDescription(info?.description);
    setStruct(info?.struct);
    setNameFirstType(info?.nameFirstType);
    setFirstType(info?.firstType?.join(","));
  }, [info]);

  return (
    <ModalUpdate
      open={open}
      title={"Cập nhật sản phẩm"}
      maxWidth={"lg"}
      handleClose={handleReset}
      handleOk={handleUpdateProduct}
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
          <Typography>Tên phân loại 1:</Typography>
          <TextField
            fullWidth
            size="small"
            value={nameFirstType}
            onChange={(e) => setNameFirstType(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Thêm loại 1: (ngăn cách nhau bởi dấu ,)</Typography>
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

export default ModalDetailProduct;
