import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid2,
  IconButton,
  Rating,
  Snackbar,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "./Product.scss";
import { Favorite, ShoppingCart, Visibility } from "@mui/icons-material";
import Button from "@mui/material/Button";
import axios from "axios";
import { MainLayout } from "./MainLayout";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../redux/slice/cartSlice";
import Notification from "./Notification";

const Product = () => {
  const [productList, setProductList] = useState([]);

  const dispatch = useDispatch();

  const handleAddToCart = (productId) => {
    const data = {
      userId: "6679b58bd1609837bb644bcc",
      productId,
      quantity: 1,
    };
    dispatch(addProductToCart(data));
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/products");
      if (response.status === 200 && response.data?.length > 0) {
        setProductList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <MainLayout>
      <Container className="bestseller" maxWidth="lg">
        <Notification />
        <Stack className="stack1">
          <p className="name h2">Danh sách sản phẩm</p>
          <p className="content content h8 regular dark-lightest95">
            Thêm sản phẩm vào giỏ hàng ngay
          </p>
        </Stack>

        <Stack className="stack2">
          <Grid2
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 16 }}
            maxWidth={"lg"}
          >
            {productList.length > 0 ? (
              productList.map((item) => {
                return (
                  <Grid2 key={item._id} xs={2} sm={4} md={4}>
                    <Card variant="outlined" className="card-item">
                      {/* HEADER */}
                      <div>
                        <Stack className="stackheader" direction={"row"}>
                          <div className="csale">
                            <p className="sale h9">SALE</p>
                          </div>
                          <IconButton className="heart">
                            <Favorite />
                          </IconButton>
                        </Stack>
                        {/* IMAGE */}
                        <Stack className="img" spacing={1}>
                          <img
                            style={{ height: "180px" }}
                            src={item.image}
                            alt=""
                          />
                        </Stack>
                        <Stack className="title" spacing={1}>
                          <p className="cate">{`${item.category.name} - ${item.brand}`}</p>
                          <p className="name">{item.name}</p>
                          <Stack className="pr" direction={"row"}>
                            <p className="price h7 medium indigo">
                              {/* {formattedNumber( */}
                              {item?.price}
                              {/* )} */}
                            </p>
                            <Rating
                              className="rating"
                              name="half-rating"
                              value={item.rating}
                              defaultValue={item.rating}
                              precision={0.1}
                              readOnly
                            />
                          </Stack>
                        </Stack>
                      </div>

                      <Stack className="btncard" spacing={1}>
                        <Button
                          className="btn btn1"
                          variant="contained"
                          onClick={() => handleAddToCart(item._id)}
                        >
                          <p className="normal h7 medium white">
                            <ShoppingCart className="icon" />
                            Thêm vào giỏ
                          </p>
                        </Button>
                        <Button
                          className="btn "
                          variant="outlined"
                          onClick={() => {}}
                        >
                          <p className="normal h7 medium indigo">
                            <Visibility className="icon" />
                            Xem chi tiết
                          </p>
                        </Button>
                      </Stack>
                    </Card>
                  </Grid2>
                );
              })
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Grid2>
        </Stack>
      </Container>
    </MainLayout>
  );
};

export default Product;
