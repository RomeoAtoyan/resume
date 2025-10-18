"use client";

import React, { useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { AnimatePresence, motion } from "framer-motion";

const fadeVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <AnimatePresence mode="wait">
        {mode === "login" ? (
          <motion.div
            key="login"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <LoginForm onSwitch={() => setMode("register")} />
          </motion.div>
        ) : (
          <motion.div
            key="register"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <RegisterForm onSwitch={() => setMode("login")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthForm;
