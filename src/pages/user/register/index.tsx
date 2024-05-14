import Button from "@/components/Btn/Btn";
import { MainWrapper } from "@/components/MainWrapper/MainWrapper";
import { FormEvent, useEffect, useState } from "react";
import { Form, Heading, Input } from "./styled";
import { I_RegisterRes, I_UniRes } from "@/types";
import { observer } from "mobx-react-lite";
import { getStoreInstance } from "@/store/user-store";
import { useRouter } from "next/router";
import MainContainer from "@/components/MainContainer/MainContainer";
import Link from "next/link";
import { Typography } from "@mui/material";
import Btn from "@/components/Btn/Btn";
import LoadingBtn from "@/components/LoadingBtn/LoadingBtn";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userStore = getStoreInstance();

  const submitHandler = async () => {
    setIsSubmitting(true);
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Submit", { email, password });

    const sendData = {
      email,
      password,
    };
    console.log(process.env.API_URL_BACKEND + "/users/register");

    const response = await fetch(
      process.env.API_URL_BACKEND + "/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      }
    );

    if (!response.ok) {
      // throw new Error(`HTTP error! status: ${response.status}`)
      console.error(`HTTP error! status: ${response.status}`);
    } else {
      const formattedRes: I_RegisterRes = await response.json();
      console.log(formattedRes);
      localStorage.setItem("token", formattedRes.data.accessToken);
      userStore.initToken(formattedRes.data.accessToken);
      router.push("/");
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    switch (event.currentTarget.name) {
      case "email":
        setEmail(event.currentTarget.value);
        break;
      case "password":
        setPassword(event.currentTarget.value);
        break;
      case "confirmPassword":
        setConfirmPassword(event.currentTarget.value);
        break;
      default:
        break;
    }
  };

  return (
    <MainContainer sx={{ py: { xs: 3, md: 4, lg: 8 } }} maxWidth="sm">
      <Heading>Registration</Heading>
      <Form>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
          required
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleInputChange}
          required
        />
        <LoadingBtn
          loading={isSubmitting}
          clickHandler={() => {
            submitHandler();
          }}
        >
          Register
        </LoadingBtn>
      </Form>
      <Typography
        component="div"
        sx={{ textAlign: "center", mt: { xs: "6px", md: "8px", lg: "12px" } }}
      >
        I already have an account. <Link href="/user/login">Login</Link>
      </Typography>
    </MainContainer>
  );
};

export default observer(RegisterPage);
