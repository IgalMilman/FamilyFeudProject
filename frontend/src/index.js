import React from "react";
import ReactDOM from "react-dom";
import { AllComponentsList } from "./AllComponents";
import "./styles/main.css"

AllComponentsList.forEach((value) => {
  const elementList = document.getElementsByTagName(value.tag);

  for (const element of elementList) {
    const props = {};
    for (const attribute of element.attributes) {
      props[attribute.name] = attribute.value;
    }
    ReactDOM.render(<value.element {...props} />, element);
  }
});
