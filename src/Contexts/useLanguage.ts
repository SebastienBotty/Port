import { createContext, useContext } from "react";
import { LanguageContextType } from "../Typescript/Types";

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguageContext doit être utilisé dans un Language Provider");
  }
  return context;
};
