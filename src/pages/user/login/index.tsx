import { MainWrapper } from "@/components/MainWrapper/MainWrapper";
import { Form, Heading, Input } from "../register/styled";
import { FormEvent, useState } from "react";
import { I_UniRes } from "@/types";
import Button from "@/components/Button/Button";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

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
    }

    const formattedRes: I_UniRes = await response.json();
    console.log(formattedRes);
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
    <MainWrapper>
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
    </MainWrapper>
  );
};

export default LoginPage;
