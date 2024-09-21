import { Provider } from "react-redux";
import InitialPage from "./InitialPage";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <InitialPage />
    </Provider>
  );
}

export default App;
