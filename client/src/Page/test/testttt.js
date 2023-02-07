import React from "react";
import {
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./styles.css";

function CL() {
  const navigate = useNavigate();

  return (
    <>
      <>
        <h2>CL</h2>
        <br />
        <div
          onClick={() => {
            navigate("modal", {
              state: {
                modalOpen: true,
              },
            });
          }}
        >
          Open Modal
        </div>
      </>

      <Outlet />
    </>
  );
}

function Modal() {
  const location = useLocation();
  const nav = useNavigate();

  console.log(location);

  return (
    <div
      style={
        location.state?.modalOpen
          ? {
              position: "absolute",
              top: "50%",
              left: "50%",
              background: "lightgrey",
              width: 200,
              height: 300,
              padding: 20,
              boxSizing: "border-box",
              marginTop: -150,
              marginLeft: -100,
            }
          : {}
      }
    >
      <h3>"Moddddal"</h3>
      <div
        onClick={() => {
          nav(-1);
        }}
      >
        Add filter (onClick)
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/cl" element={<CL />}>
          <Route path="modal" element={<Modal />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
