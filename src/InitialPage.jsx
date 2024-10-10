import Codes from "./codes/Codes";
import Logo from "./Logo";
import Results from "./results/Results";
import DarkModeToggle from "./ui/DarkModeToggle";

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
