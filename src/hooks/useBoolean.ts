import { useState } from "react";

export const useBoolean = (initialValue: boolean = false) => {
  const [value, setValue] = useState<boolean>(initialValue);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue((prev) => !prev);
  return { value, setTrue, setFalse, toggle };
};
