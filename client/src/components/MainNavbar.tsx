import React, { useState } from "react";
import {
  createStyles,
  Container,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Paper,
  Title,
  Box,
  Image,
  Avatar,
  Button,
} from "@mantine/core";
import { Logout, Settings, ChevronDown } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import { Link, NavLink } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  accountBtn: {
    backgroundColor: theme.colors.green[7],

    ":hover": {
      backgroundColor: theme.colors.green[4],
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: 6,

    ":hover": {
      cursor: "pointer",
    },
  },
}));

export function MainNavbar() {
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const user = {
    name: "Dhencio",
  };

  //   const logout = async () => {
  //     try {
  //       await axios.get("/api/signout");
  //       queryClient.removeQueries(["me"], { exact: true });
  //       dispatch(clearUser());
  //       showNotification({
  //         title: "BYE BYE 👋",
  //         message: `Thanks for the visit`,
  //         color: "green",
  //         autoClose: 1000,
  //       });
  //     } catch (error) {
  //       showNotification({
  //         title: "Oh Noh! ⚠",
  //         message: `Something went wrong`,
  //         color: "red",
  //       });
  //     } finally {
  //       router.push(location);
  //       queryClient.invalidateQueries(["me"], { exact: true });
  //     }
  //   };

  const renderAuthMenu = React.useMemo(() => {
    return Boolean(user) ? (
      <Menu
        size={180}
        placement='end'
        transition='pop-top-right'
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        control={
          <UnstyledButton
            className={cx(classes.user, {
              [classes.userActive]: userMenuOpened,
            })}
          >
            <Group spacing={7}>
              <Avatar
                src='https://robohash.org/eda'
                alt='user avatay'
                radius='xl'
                size={20}
              />
              <Text
                transform='capitalize'
                weight={500}
                size='sm'
                sx={{ lineHeight: 1 }}
                mr={3}
              >
                {user?.name}
              </Text>
              <ChevronDown size={12} />
            </Group>
          </UnstyledButton>
        }
      >
        <Link to='/account'>
          <Menu.Item
            sx={(th) => ({ ":hover": { backgroundColor: th.colors.gray[0] } })}
            component='a'
            icon={<Settings size={14} />}
          >
            Account
          </Menu.Item>
        </Link>
        <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>
      </Menu>
    ) : (
      <Link to='/auth'>
        <Button component='a' color='green'>
          Login
        </Button>
      </Link>
    );
    // eslint-disable-next-line
  }, [user]);

  return (
    <Paper shadow='md' pt='sm'>
      <Container size={1300} className={classes.mainSection}>
        <Group py='sm' position='apart'>
          <NavLink to='/' style={{ textDecoration: "none" }}>
            <Box className={classes.logo}>
              <Title sx={(th) => ({ color: th.colors.cyan[6] })} order={4}>
                <Text
                  size='lg'
                  component='span'
                  sx={(th) => ({
                    color: th.colors.blue[7],
                    fontStyle: "italic",
                  })}
                >
                  BOOK/
                </Text>
                STORE
              </Title>
            </Box>
          </NavLink>
          {renderAuthMenu}
        </Group>
      </Container>
    </Paper>
  );
}
