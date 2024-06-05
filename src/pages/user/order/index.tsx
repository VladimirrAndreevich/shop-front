import React, { ChangeEventHandler, useEffect, useState } from "react";
import MainContainer from "@/components/MainContainer/MainContainer";
import LoadingBtn from "@/components/LoadingBtn/LoadingBtn";
import { Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { getStoreInstance } from "@/store/user-store";
import { observer } from "mobx-react-lite";

const OrderPage: React.FC = () => {
  const [userInput, setUserInput] = useState({
    nameFirst: "",
    nameSecond: "",
    country: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
  });
  const router = useRouter();
  const userStore = getStoreInstance();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({
      ...userInput,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const submitHandler = async () => {
    setIsSubmitting(true);
    const body = {
      ...userInput,
      postalCode: +userInput.postalCode,
      phonePhone: +userInput.phoneNumber,
    };

    // console.log(body);

    const config = {
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      },
    };

    const response = await axios
      .post(
        `${process.env.API_URL_BACKEND}/users/order/create`,
        userInput,
        config
      )
      .then((response) => response.data);

    userStore.updateCart();
    router.push("/");
    setIsSubmitting(false);
  };

  return (
    <MainContainer
      sx={{ py: { xs: 3, md: 4, lg: 8 }, minHeight: "calc(100vh - 184px)" }}
      maxWidth="sm"
    >
      <Typography variant="h2" fontSize={35}>
        Place your order
      </Typography>
      <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
        <TextField
          id="filled-basic"
          label="Your first name"
          variant="filled"
          name="nameFirst"
          type="text"
          required
          value={userInput.nameFirst}
          onChange={handleChange}
        />
        <TextField
          id="filled-basic"
          label="Your second name"
          variant="filled"
          name="nameSecond"
          type="text"
          required
          value={userInput.nameSecond}
          onChange={handleChange}
        />
        <TextField
          id="filled-basic"
          label="Country"
          variant="filled"
          name="country"
          required
          value={userInput.country}
          onChange={handleChange}
        />
        <TextField
          id="filled-basic"
          label="Your address"
          variant="filled"
          name="address"
          required
          value={userInput.address}
          onChange={handleChange}
        />
        <TextField
          id="filled-basic"
          label="Postal code"
          variant="filled"
          name="postalCode"
          type="number"
          required
          value={userInput.postalCode}
          onChange={handleChange}
        />
        <TextField
          id="filled-basic"
          label="Phone number"
          variant="filled"
          name="phoneNumber"
          type="number"
          required
          value={userInput.phoneNumber}
          onChange={handleChange}
        />
        <LoadingBtn
          loading={isSubmitting}
          sx={{ mt: 1 }}
          clickHandler={submitHandler}
        >
          Checkout
        </LoadingBtn>
      </Stack>
    </MainContainer>
  );
};

export default observer(OrderPage);
