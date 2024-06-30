import { Grid } from "@mui/material";
import React from "react";
import HomeCart from "./HomeCart";

export default function HomeCategory() {
  const listCategory = [
    "/img/home/HomeCard1.jpg",
    "/img/home/HomeCard2.png",
    "/img/home/HomeCard3.png",
    "/img/home/HomeCard4.png",
    "/img/home/HomeCard5.jpg",
    "/img/home/HomeCard6.png",
  ];
  return (
    <Grid container spacing={0.5}>
      {listCategory?.map((e) => (
        <Grid item xs={4} md={2} key={e}>
          <HomeCart img={e} />
        </Grid>
      ))}
    </Grid>
  );
}
