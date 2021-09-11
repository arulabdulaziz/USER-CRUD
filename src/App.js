import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import JumbotronComponent from "./components/JumbotronComponent";
import MainPage from "./pages/MainPage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import DetailPage from "./pages/DetailPage";
function App() {
  return (
    <div className="App">
      <Router>
        <JumbotronComponent />
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route exact path="/add">
            <AddPage />
          </Route>
          <Route exact path="/detail/:id">
            <DetailPage />
          </Route>
          <Route exact path="/edit/:id">
            <EditPage />
          </Route>
          <Route path="/error-404">
            <div className="text-center">
              <p>Data Not Found</p>
            </div>
          </Route>
          <Route path="*">
            <div className="text-center">
              <p>Page Not Found</p>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
