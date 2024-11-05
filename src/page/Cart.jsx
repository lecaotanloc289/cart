import React, { useEffect, useState } from "react";
import { MainLayout } from "./MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../redux/slice/cartSlice";
import { Checkbox, Grid, Grid2, IconButton, Stack } from "@mui/material";
import "./Cart.scss";
export default function Cart() {
  const { items, status, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [selectedProducts, setSelectProducts] = useState([]);

  const handleSelectProduct = (product) => {
    if (selectedProducts.some((item) => item.productId._id === product.productId._id)) {
      const nextProductList = selectedProducts.filter(
        (productItem) => productItem.productId._id !== product.productId._id
      );
      setSelectProducts(nextProductList);
    } else {
      setSelectProducts([...selectedProducts, product]);
    }
  };

  function totalMoney (productList) {
    return productList.reduce((total, product) => total + product?.productId?.price * product.quantity, 0);
  }

  function handleIncrease () {}
  function handleDecrease () {}
  useEffect(() => {
    dispatch(getCart("6679b58bd1609837bb644bcc"));
  }, [dispatch]);
  return (
    <MainLayout>
      <Stack direction={"row"} spacing={2} justifyContent={"space-evenly"}>
        <Grid2  size={{xs: 7, md: 7}}>
          <h2>Giỏ hàng</h2>
          {status === "loading" && <p>Đang tải...</p>}
          {status === "failed" && <p>{error}</p>}
          {items.length === 0 ? (
            <p>Giỏ hàng của bạn trống!</p>
          ) : (
            <ul>
              {items?.length > 0 ? (
                items.map((product, key) => (
                  <div className="cart-product">
                    <Grid container spacing={2} className="center" key={key}>
                      <Grid className="flex-row" xs={3}>
                        <Checkbox
                          className="checkbox"
                          size="large"
                          checked={selectedProducts?.includes(product)}
                          onChange={() => handleSelectProduct(product)
                          }
                        />
                        <div className="image-container center">
                          <img
                            width={120}
                            className="product-image"
                            src={product.productId?.image}
                            alt=""
                          />
                        </div>
                      </Grid>
                      <Grid xs={4}>
                        <div>
                          <p className="h7 medium dark-title">
                            {product.productId?.name}
                          </p>
                          <p className="h8 regular dark-lightest95">
                            {product.productId?.brand}
                          </p>
                        </div>
                      </Grid>
                      <Grid xs={2}>
                        <p
                          style={{ lineHeight: "32px" }}
                          className="h7 medium green product-price"
                        >
                          {product.productId?.price}
                        </p>
                      </Grid>
                      <Grid xs={2}>
                        <Stack spacing={1} direction={"row"}>
                          <IconButton
                            onClick={() => handleDecrease(product.productId?._id)}
                          >
                            -
                          </IconButton>
                          <p className="h8 medium dark-title product-quantity">
                            {product.quantity}
                          </p>
                          <IconButton
                            onClick={() => handleIncrease(product.productId?._id)}
                          >
                            +
                          </IconButton>
                        </Stack>
                      </Grid>
                      <Grid xs={1}>
                        <IconButton
                          // onClick={() =>
                          //     handleOpenDialog(
                          //         i.productId._id,
                          //     )
                          // }
                          className="delete-product"
                        >
                          {/* <img src={icons.Trash} alt="" /> */}
                          Xóa
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>
                ))
              ) : (
                <> Giỏ hàng trống</>
              )}
            </ul>
          )}
        </Grid2>
        <Grid2 size={{xs: 5, md: 5}}>
        <h2>Các sản phẩm đã chọn</h2>
        {selectedProducts?.length > 0 ? 
          <>
            {selectedProducts.map((product) => 
            <Grid sx={{my: 4}} container spacing={2} className="center" key={product?._id}>
            <Grid className="" xs={2}>
                <img
                  width={50}
                  src={product?.productId?.image}
                  alt=""
                />
            </Grid>
            <Grid xs={5}>
              <div>
                <p className="h8 medium dark-title">{product?.productId?.name}</p>
                <p className="h8 regular dark-lightest95">
                  {product?.productId?.brand}
                </p>
              </div>
            </Grid>
            <Grid xs={2}>
              <p
                style={{ lineHeight: "32px" }}
                className="h7 medium green product-price"
              >
                {product?.productId?.price}
              </p>
              <p className="h8 medium dark-title product-quantity">
                  SL: {product?.quantity}
                </p>
            </Grid>
            
          </Grid>
            )}
            <h4>Tổng số tiền: {totalMoney(selectedProducts)}</h4>
          </>
        
           : <>Chưa có sản phẩm được chọn</>
        }
        
        </Grid2> 
      </Stack>
    </MainLayout>
  );
}

