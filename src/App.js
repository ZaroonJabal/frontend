import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import AppRoutes from "./routes";
import SearchBar from "./components/SearchBar";


function App() {
  return (
    <>
      <Header />
      <SearchBar/>
      <AppRoutes></AppRoutes>
    </>
  );
}

export default App;
