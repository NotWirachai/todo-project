import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "../stores/root-stores";

interface Props {}

const NotFound: React.FC<Props> = observer(() => {
  return <div>NotFound</div>;
});

export default NotFound;
