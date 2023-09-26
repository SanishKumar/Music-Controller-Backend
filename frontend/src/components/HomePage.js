import React, { useState, useEffect } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
      });
  }, []);

  const renderHomePage = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            SYNCHRONOUS 6
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button
              color="primary"
              component={Link}
              to="/join"
            >
              Join a Room
            </Button>
            <Button
              color="secondary"
              component={Link}
              to="/create"
            >
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  };

  const clearRoomCode = () => {
    setRoomCode(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            roomCode ? (
              <Outlet />
            ) : (
              renderHomePage()
            )
          }
        />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route
          path="/room/:roomCode"
          element={<Room leaveRoomCallback={clearRoomCode} />}
        />
      </Routes>
    </Router>
  );
}

export default HomePage;
