import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading() {
  return (
    <div>
      <CircularProgress data-testid="spinner" color="secondary" />
    </div>
  );
}
