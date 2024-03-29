import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";
import Home from "./Routes/Home/Home";
import Dashboard from "./Routes/Dashboard/Dashboard";
import Login from "./Routes/Login/Login";
import Logout from "./Routes/Logout/Logout";
import Navi from "./Routes/Navbar/Navi";
import { ICalendarEvent } from "./Components/Calendar";
import "bootstrap/dist/css/bootstrap.min.css";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers";
import ThemeProvider from "./Providers/ThemeProvider";
import LocationProvider from "./Providers/LocationProvider";
import { Fragment } from "react";

export const initAlanBtn = () => {
  if (!(window as any).alanBtnInstance) {
    (window as any).alanBtnInstance = alanBtn({
      key: "93d40f793be48938c88976e9550ffd182e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData: any) => {
        switch (commandData.command) {
          case "navigate:Dashboard":
            window.location.pathname = "/dashboard";
            break;
          case "navigate:Home":
            window.location.pathname = "/";
            break;
          case "navigate:SignIn":
            window.location.pathname = "/login";
            break;
          case "go:Back":
            history.back();
            break;
          case "createEvent":
            console.log(commandData.eventInfo);
            document.dispatchEvent(new CustomEvent<ICalendarEvent>("calendarCreateEvent", { detail: commandData.eventInfo }));
            break;
          case "viewEvent":
            document.dispatchEvent(new CustomEvent("calendarViewEvent", { detail: commandData.title }));
            console.log("Viewing event: " + commandData.title);
            break;
          case "closeEvent":
            document.dispatchEvent(new Event("calendarCloseEvent"));
            break;
          case "deleteEvent":
            document.dispatchEvent(new Event("calendarDeleteEvent"));
            break;
          case "switchThemeMode":
            console.log(commandData.theme);
            document.dispatchEvent(new CustomEvent("switchThemeMode", { detail: commandData.theme }));
            break;
          default:
        }
      }
    });
  }
};

function App () {
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <BrowserRouter>
          <LocationProvider>
            <Fragment>
              <Navi />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </Fragment>
          </LocationProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
