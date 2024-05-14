import { MainWrapper } from "@/components/MainWrapper/MainWrapper";
import { Form, Heading, Input } from "../register/styled";
import { FormEvent, useState } from "react";
import { I_LoginRes, I_UniRes } from "@/types";
import Button from "@/components/Button/Button";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { getStoreInstance } from "@/store/user-store";
import MainContainer from "@/components/MainContainer/MainContainer";
import { Typography } from "@mui/material";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const userStore = getStoreInstance();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sendData = {
      email,
      password,
    };

    const response = await fetch(process.env.API_URL_BACKEND + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });

    if (!response.ok) {
      // throw new Error(`HTTP error! status: ${response.status}`)
      console.error(`HTTP error! status: ${response.status}`);
    } else {
      const formattedRes: I_LoginRes = await response.json();
      if (formattedRes.data.accessToken) {
        localStorage.setItem("token", formattedRes.data.accessToken);
        userStore.initToken(formattedRes.data.accessToken);
        router.push("/");
      }
    }
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    switch (event.currentTarget.name) {
      case "email":
        setEmail(event.currentTarget.value);
        break;
      case "password":
        setPassword(event.currentTarget.value);
        break;
      default:
        break;
    }
  };

  return (
    <MainContainer sx={{ py: { xs: 3, md: 4, lg: 8 } }} maxWidth="sm">
      <Heading>Login</Heading>
      <Form onSubmit={submitHandler}>
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
        <Button>Login</Button>
      </Form>
      <Typography
        component="div"
        sx={{ textAlign: "center", mt: { xs: "6px", md: "8px", lg: "12px" } }}
      >
        I haven't any account. <Link href="/user/register">Register</Link>
      </Typography>
    </MainContainer>
  );
};

export default observer(LoginPage);
