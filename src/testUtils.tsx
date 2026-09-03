import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageContext } from "./Contexts/useLanguage";
import { LanguageType } from "./Typescript/Types";

export function renderWithProviders(
  ui: React.ReactElement,
  language: LanguageType = "EN"
): RenderResult {
  return render(
    <MemoryRouter>
      <LanguageContext.Provider value={{ language, setLanguage: () => {} }}>
        {ui}
      </LanguageContext.Provider>
    </MemoryRouter>
  );
}
