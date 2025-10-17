"use client";

import React, { useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  return (
    <>
      {mode === "login" ? (
        <LoginForm onSwitch={() => setMode("register")} />
      ) : (
        <RegisterForm onSwitch={() => setMode("login")} />
      )}
    </>
  );
};

export default AuthForm;
