import React from "react";

const style = {
  color: "red"
};

export default function Error({ error }) {
  const errMsg = typeof error === "object" ? error.message : error;
  return <h1 style={style}>Error: {errMsg}</h1>;
}
