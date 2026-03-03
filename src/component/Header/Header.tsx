import { Link, NavLink } from "react-router";
import styles from "./Header.module.css";
import { memo } from "react";
import { Button, Stack, Toolbar } from "@mui/material";

const Header = memo(() => {
  console.log("first");
  return (
    <header>
      <Link to="/">
        <img
          className={styles.logo}
          src="../../../public/picture/logo.png"
          alt="Word Flip"
        />
      </Link>
      <nav>
        <Toolbar>
          <Stack
            sx={{ flexGrow: 1, display: { xs: "flex", flexDirection: "row" } }}
          >
            <Button component={NavLink} to="/word-list" sx={{ color: "white" }}>
              word-list
            </Button>
            <Button
              component={NavLink}
              to="/flash-cards"
              sx={{ color: "white" }}
            >
              flash-cards
            </Button>

            <Button
              component={NavLink}
              to="/repeat-words"
              sx={{ color: "white" }}
            >
              repeat-words
            </Button>
          </Stack>
        </Toolbar>
      </nav>

      {/* <nav>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.headerLink
          }
          to="/word-list"
        >
          word-list
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.headerLink
          }
          to="/flash-cards"
        >
          flash-cards
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.headerLink
          }
          to="/repeat-words"
        >
          repeat-words
        </NavLink>
      </nav> */}
    </header>
  );
});

export default Header;
