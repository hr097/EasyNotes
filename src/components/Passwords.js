import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Container,
  Tooltip,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import { TabContextCreate } from "../context/TabContext";
import { MdOutlineDelete, MdVisibility, MdVisibilityOff } from "react-icons/md";
import CryptoJS from "crypto-js";

export default function Passwords(props) {
  //************* Using Context *************
  const Tabs = useContext(TabContextCreate);
  const selectedTab = Tabs.Passwords.find(
    (tab) => tab.TabId === Tabs.selectedTabId
  );

  const style = {
    PsdAddBox: {
      px: Tabs.isMobile ? 0 : 3.5,
    },
    TextField: {
      backgroundColor: "transparent",
      border: "2px #2d3036  solid",
      borderRadius: 1,
      input: {
        color: "rgb(232, 232, 232)",
      },
      "& fieldset": { border: "none" },
    },
    psdlist: {
      mt: 2,
      borderRadius: 2,
      minHeight: "48vh",
      height: "auto",
      marginBottom: "10px",
      px: Tabs.isMobile ? 0 : 3.5,
    },
    psdContainer: {
      backgroundColor: "#2d3036",
      mt: 1,
      mb: 1,
      borderRadius: 1,
      width: "100%",
      maxWidth: "100%",
      "&:hover": {
        backgroundColor: "#353940",
        cursor: "pointer",
        transition: "transform .3s ease-out",
        transform: "scale(1.01)",
      },
    },
    truncate: {
      maxWidth: "150px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    PasswordBox: {
      backgroundColor: "transparent",
      border: "none",
      borderRadius: 1,
      color: "rgb(232, 232, 232)",
      fontSize: "16px",
      outline: "none",
    },
    UserName: {
      "&:hover": {
        backgroundColor: "#1976d2",
        color: "#fff",
      },
    },
  };

  const [Label, SetLabel] = useState("");
  const [UserName, SetUserName] = useState("");
  const [Password, SetPassword] = useState("");
  const [showPassword, setShowPassword] = useState(null);

  //Encrypt and Decrypt password
  const encryptPassword = (password) => {
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      "encryptionKey"
    ).toString();
    return encryptedPassword;
  };

  const decryptPassword = (encryptedPassword) => {
    const decryptedPassword = CryptoJS.AES.decrypt(
      encryptedPassword,
      "encryptionKey"
    ).toString(CryptoJS.enc.Utf8);
    return decryptedPassword;
  };

  //************* Add button handling *************
  const AddPassword = (e) => {
    if (Label !== "" && UserName !== "" && Password !== "") {
      const encryptedPassword = encryptPassword(Password);
      Tabs.SetPasswords([
        ...Tabs.Passwords,
        {
          Passid: uuid(),
          TabId: Tabs.selectedTabId,
          Label: Label,
          UserName: UserName,
          Password: encryptedPassword,
          // Password: Password,
        },
      ]);
    }
    SetLabel("");
    SetUserName("");
    SetPassword("");
    e.preventDefault();
  };

  //************* set data to local storage *************
  useEffect(() => {
    localStorage.setItem("Passwords", JSON.stringify(Tabs.Passwords));
  }, [Tabs.Passwords]);

  //************* delete todos function *************
  const DeleteTask = (index) => {
    let newList = [...Tabs.Passwords];
    newList.splice(index, 1);
    Tabs.SetPasswords([...newList]);
  };

  const togglePasswordVisibility = (index) => {
    // setShowPassword(!showPassword);
    setShowPassword(index === showPassword ? null : index);
  };

  // Filter the labels based on the search text
  const filteredLabels = Tabs.Passwords.filter((psd) =>
    psd.Label.toLowerCase().includes(props.searchText.toLowerCase())
  );

  const copyUsername = (username) => {
    navigator.clipboard.writeText(username);
  };

  return (
    <>
      <Box sx={style.PsdAddBox}>
        <form onSubmit={AddPassword}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                placeholder="Enter Label"
                fullWidth
                sx={style.TextField}
                onChange={(e) => {
                  SetLabel(e.target.value);
                }}
                value={Label}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                placeholder="Username"
                fullWidth
                sx={style.TextField}
                onChange={(e) => {
                  SetUserName(e.target.value);
                }}
                value={UserName}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="password"
                placeholder="Password"
                fullWidth
                sx={style.TextField}
                onChange={(e) => {
                  SetPassword(e.target.value);
                }}
                value={Password}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={1}>
              <Button variant="contained" size="large" type="submit">
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* Task List */}
      <Box sx={style.psdlist}>
        {Tabs.Passwords.length > 0 &&
          filteredLabels.map((data, key) => {
            if (selectedTab && data.TabId === selectedTab.TabId) {
              const isPasswordVisible = key === showPassword;
              return (
                <Container maxWidth key={key} sx={style.psdContainer}>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={3}>
                        <p style={style.truncate}>{data.Label}</p>
                      </Grid>
                      <Grid item xs={4}>
                        <Tooltip title="Copy" arrow>
                          <p
                            style={{ ...style.truncate, ...style.UserName }}
                            onClick={() => copyUsername(data.UserName)}
                          >
                            {data.UserName}
                          </p>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={4}>
                        <input
                          type={isPasswordVisible ? "text" : "password"}
                          value={decryptPassword(data.Password)}
                          style={style.PasswordBox}
                          readOnly
                        />
                      </Grid>
                    </Grid>

                    <Box
                      style={{
                        marginRight: "8px",
                      }}
                      onClick={() => togglePasswordVisibility(key)}
                    >
                      {isPasswordVisible ? (
                        <MdVisibilityOff />
                      ) : (
                        <MdVisibility />
                      )}
                    </Box>

                    <Box>
                      <MdOutlineDelete
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          DeleteTask(key);
                        }}
                      />
                    </Box>
                  </Box>
                </Container>
              );
            } else {
              return null;
            }
          })}
      </Box>
    </>
  );
}
