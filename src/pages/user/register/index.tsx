import Button from "@/components/Button/Button";
import { MainWrapper } from "@/components/MainWrapper/MainWrapper";
import { FormEvent, useState } from "react";
import { Form, Heading, Input } from "./styled";
import { I_RegisterRes, I_UniRes } from "@/types";
import { observer } from "mobx-react-lite";
import { getStoreInstance } from "@/store/user-store";
import { useRouter } from "next/router";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const userStore = getStoreInstance();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    <MainWrapper>
      <Heading>Registration</Heading>
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
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleInputChange}
          required
        />
        <Button>Register</Button>
      </Form>
    </MainWrapper>
  );
};

export default observer(RegisterPage);
