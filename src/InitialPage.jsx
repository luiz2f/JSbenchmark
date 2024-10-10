import { lazy } from "react";
import Logo from "./Logo";
import DarkModeToggle from "./ui/DarkModeToggle";

const Codes = lazy(() => import("./codes/Codes"));

const Results = lazy(() => import("./results/Results"));

function InitialPage() {
  return (
    <>
      <DarkModeToggle />
      <Logo />
      <Codes />
      <Results />
    </>
  );
}

export default InitialPage;
