import React from "react";
import { render } from "@testing-library/react";
import ReactDOM from "react-dom";

test("UserLogged", () => {
  const test_user: any = {
    userEmail: "sergio@gmail.com",
    userName: null,
    userUid: "vsPzEn78etQCXJiRujYzXbYdzaI3",
  };
  localStorage.setItem("usuario", test_user);
  const user = localStorage.getItem("usuario");
  // check user  is not null
  expect(user).not.toBeNull();
});
