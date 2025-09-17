import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useBlog from "../context/useBlog";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar({ lang, setLang }) {
  const { token, logout } = useBlog();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  // sync language
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "#222" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "0",
          }}
        >
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              🐱 CatBlog
            </Link>
          </Typography>

          {/* Menu Button */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ padding: "0" }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 180,
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
            backgroundColor: "#fdfdfd",
          },
        }}
      >
        {token ? (
          <>
            <MenuItem
              onClick={() => {
                logout();
                handleMenuClose();
              }}
              sx={{
                fontWeight: 500,
                color: "red",
                "&:hover": { backgroundColor: "#ffe6e6", color: "darkred" },
              }}
            >
              {t("logout")}
            </MenuItem>

            <MenuItem
              sx={{
                "& a": {
                  textDecoration: "none",
                  color: "#333",
                  width: "100%",
                  display: "block",
                },
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <Link to="/admin">{t("dashboard")}</Link>
            </MenuItem>

            <MenuItem
              sx={{
                "& a": {
                  textDecoration: "none",
                  color: "#333",
                  width: "100%",
                  display: "block",
                },
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <Link to="/">{t("home")}</Link>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            onClick={handleMenuClose}
            sx={{
              "& a": {
                textDecoration: "none",
                color: "#333",
                width: "100%",
                display: "block",
              },
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <Link to="/login">{t("login")}</Link>
          </MenuItem>
        )}

        {/* Language Switcher */}
        <MenuItem
          onClick={() => {
            setLang(lang === "ar" ? "en" : "ar");
            handleMenuClose();
          }}
          sx={{
            fontWeight: 600,
            color: "#1976d2",
            "&:hover": { backgroundColor: "#e3f2fd" },
          }}
        >
          {lang === "ar" ? "اللغه الإنجليزية" : "Arabic Language"}
        </MenuItem>
      </Menu>
    </Box>
  );
}
