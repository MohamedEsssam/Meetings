import React from "react";

import AppText from "../AppText";

function FormErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <AppText>{error}</AppText>;
}

export default FormErrorMessage;
