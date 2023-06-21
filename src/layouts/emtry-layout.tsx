import React, { Component } from "react";
import { Route } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface Props {}

const EmptyLayout: React.FC<Props> = observer(() => {
  return <div></div>;
});

export default EmptyLayout;
