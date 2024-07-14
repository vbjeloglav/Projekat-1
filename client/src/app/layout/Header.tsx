import { DarkMode, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import path from "path";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../contex/StoreContext";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";
import zIndex from "@mui/material/styles/zIndex";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const midLinks = [
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "prijava", path: "/prijava" },
  { title: "registracija", path: "/registracija" },
];

const navStyles = {
  typography: "h6",
  textDecoration: "none",
  color: "inherit",

  "&:hover": {
    color: "#AFEAE3",
  },
  "&.active": {
    color: "text.secondary",
  },
};

export default function Header({ darkMode, handleThemeChange }: Props) {
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.kolicina, 0);

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
            IZNAJMLJIVANJE OPREME
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>

        <List sx={{ display: "flex" }}>
          <div style={{ zIndex: 99 }} className="menu-bar">
            <ul>
              <li>
                <a>
                  <Typography variant="h6" marginTop={2.5}>
                    KATALOG
                  </Typography>
                </a>
                <li />
                <div className="sub-menu-1">
                  <ul>
                    <Box display="flex">
                      <li
                        style={{
                          backgroundImage: "url(Images/sportovi/biciklizam.jpg",
                          width: 270.5,
                          height: 150,
                          fontSize: 35,
                          textAlign: "center",
                          backgroundSize: "center",
                        }}
                      >
                        <NavLink to="Catalog">BICIKLIZAM</NavLink>
                      </li>
                      <li
                        style={{
                          backgroundImage: "url(Images/sportovi/skijanje.jpg",
                          width: 270.5,
                          height: 150,
                          fontSize: 35,
                          textAlign: "center",
                          backgroundSize: "center",
                        }}
                      >
                        <NavLink to="CatalogSkijanje">SKIJANJE</NavLink>
                      </li>
                    </Box>
                    <Box display="flex">
                      <li
                        style={{
                          backgroundImage: "url(Images/sportovi/kajak.jpg",
                          width: 270.5,
                          height: 150,
                          backgroundSize: "center",
                          textAlign: "center",
                          fontSize: 35,
                        }}
                      >
                        <NavLink to="CatalogKajak">KAJAK</NavLink>
                      </li>
                      <li
                        style={{
                          backgroundImage: "url(Images/sportovi/kvadovi.jpg",
                          width: 270.5,
                          height: 150,
                          fontSize: 35,
                          textAlign: "center",
                          backgroundSize: "center",
                        }}
                      >
                        <NavLink to="CatalogKvadovi">KVADOVI</NavLink>
                      </li>
                    </Box>

                    <Box display="flex">
                      <li
                        style={{
                          backgroundImage: "url(Images/sportovi/kampovanje.jpg",
                          width: 178,
                          height: 150,
                          fontSize: 18,
                          textAlign: "initial",
                          backgroundSize: "center",
                        }}
                      >
                        <NavLink to="CatalogKampovanje">KAMPOVANJE</NavLink>
                      </li>
                      <li
                        style={{
                          backgroundImage: "url(Images/sportovi/trotinet.jpg",
                          width: 178,
                          backgroundSize: "center",
                          textAlign: "center",
                          fontSize: 18,
                        }}
                      >
                        <NavLink to="CatalogE_biciklo">
                          E-BICIKLO/TROTINET
                        </NavLink>
                      </li>
                      <li
                        style={{
                          backgroundImage:
                            "url(Images/sportovi/planinarenje.jpg",
                          height: 150,
                          width: 178,
                          backgroundSize: "center",
                          fontSize: 18,
                        }}
                      >
                        <NavLink to="CatalogPlaninarenje">PLANINARENJE</NavLink>
                      </li>
                    </Box>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
          {user && user.roles?.includes("Admin") && (
            <ListItem component={NavLink} to={"/inventory"} sx={navStyles}>
              INVENTORY
            </ListItem>
          )}
          {user && user.roles?.includes("Admin") && (
            <ListItem
              component={NavLink}
              to={"/preglednarudzbe"}
              sx={navStyles}
            >
              PREGLED NARUDŽBE
            </ListItem>
          )}
          {user && user.roles?.includes("Admin") && (
            <ListItem component={NavLink} to={"/rezervacije"} sx={navStyles}>
              REZERVACIJE
            </ListItem>
          )}
        </List>
        <Box display="flex" alignItems="center">
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={itemCount} color="secondary" sx={navStyles}>
              <ShoppingCart />
            </Badge>
          </IconButton>

          {user ? (
            <SignedInMenu />
          ) : (
            <List sx={{ display: "flex" }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
