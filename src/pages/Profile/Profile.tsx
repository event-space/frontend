import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Input,
  InputLabel,
  Link,
  Modal,
  Paper,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useUserStore } from '../../app/store/useUserStore';
import { IUser } from '../../entities/types/IUser';
import useFetch from '../../shared/network/useFetch';

export default function Profile() {
  const { user: userInfo, loading } = useUserStore();
  const [user, setUserData] = useState<IUser>();
  const { fetchData } = useFetch<IUser>(
    'https://space-event.kenuki.org/security-service/api/user/profile',
  );
  const { fetchData: editUserData } = useFetch<IUser>(
    'https://space-event.kenuki.org/security-service/api/user/profile-update',
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      fetchData({
        headers: {
          Authorization: `Bearer ${userInfo?.tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }).then(response => {
        if (response) {
          setUserData(response);
        }
      });
    }
  }, [loading]);

  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState({ ...user });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    console.log(name, value);
    setEditUser({ ...editUser, [name]: value });
  };

  const handleSave = async () => {
    console.log(editUser);
    editUserData({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.tokens.accessToken}`,
      },
      body: JSON.stringify({
        // phone_number: editUser.phoneNumber,
        lastName: 'asd',
      }),
    }).then(res => {
      console.log(res);
    });
  };

  return (
    <Box component="section" className={styles.profile}>
      <div className="container">
        <Box component="div" className={styles.profile__wrapper}>
          <Box>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate('/')}
              >
                Home
              </Link>
              <Typography sx={{ color: 'text.primary' }}>Profile</Typography>
            </Breadcrumbs>
            <Typography sx={{ fontSize: '36px', fontWeight: '600' }}>
              {user?.role} Profile
            </Typography>
          </Box>
          <Paper
            sx={{
              display: 'inline-flex',
              gap: '50px',
              padding: '20px 40px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '50px',
                alignItems: 'start',
                justifyContent: 'start',
              }}
            >
              <Paper
                sx={{
                  display: 'flex',
                  padding: '20px 50px',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'black',
                      color: 'white',
                      border: '1px solid white',
                      width: '150px',
                      height: '150px',
                      fontSize: '128px',
                    }}
                  >
                    {user?.firstname?.substring(0, 1)}
                  </Avatar>
                  <Typography sx={{ fontSize: '18px' }}>
                    {user?.email}
                  </Typography>
                  <Button variant="outlined" onClick={handleOpen}>
                    Edit Profile
                  </Button>
                </Box>
              </Paper>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '50px',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '20px 50px',
                    width: '100%',
                  }}
                >
                  <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>
                    Personal Info
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <InputLabel
                      htmlFor="email"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        fontSize: '16px',
                        color: 'black',
                      }}
                    >
                      Email
                      <Input
                        id="email"
                        sx={{
                          border: '1px solid black',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          color: 'black',
                          '&.Mui-disabled': {
                            color: 'black',
                            borderColor: 'black',
                          },
                        }}
                        value={user?.email}
                        disabled
                        disableUnderline
                      />
                    </InputLabel>
                    <InputLabel
                      htmlFor="firstname"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        fontSize: '16px',
                        color: 'black',
                      }}
                    >
                      First Name
                      <Input
                        id="firstname"
                        sx={{
                          border: '1px solid black',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          color: 'black',
                          '&.Mui-disabled': {
                            color: 'black',
                            borderColor: 'black',
                          },
                        }}
                        value={user?.firstname}
                        disabled
                        disableUnderline
                      />
                    </InputLabel>
                    <InputLabel
                      htmlFor="lastname"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        fontSize: '16px',
                        color: 'black',
                      }}
                    >
                      Last Name
                      <Input
                        id="lastname"
                        sx={{
                          border: '1px solid black',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          color: 'black',
                          '&.Mui-disabled': {
                            color: 'black',
                            borderColor: 'black',
                          },
                        }}
                        value={user?.lastname}
                        disabled
                        disableUnderline
                      />
                    </InputLabel>
                    <InputLabel
                      htmlFor="phoneNumber"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        fontSize: '16px',
                        color: 'black',
                      }}
                    >
                      Phone Number
                      <Input
                        type="phoneNumber"
                        id="email"
                        sx={{
                          border: '1px solid black',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          color: 'black',
                          '&.Mui-disabled': {
                            color: 'black',
                            borderColor: 'black',
                          },
                        }}
                        value={user?.phoneNumber}
                        disabled
                        disableUnderline
                      />
                    </InputLabel>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Paper>
        </Box>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Edit Profile
          </Typography>
          <InputLabel>First Name</InputLabel>
          <Input
            name="firstName"
            value={editUser.firstname}
            onChange={handleChange}
            disableUnderline
            sx={{
              border: '1px solid black',
              padding: '5px 10px',
              borderRadius: '5px',
            }}
          />
          <InputLabel>Last Name</InputLabel>
          <Input
            name="lastName"
            value={editUser.lastname}
            onChange={handleChange}
            disableUnderline
            sx={{
              border: '1px solid black',
              padding: '5px 10px',
              borderRadius: '5px',
            }}
          />
          <InputLabel>Phone Number</InputLabel>
          <Input
            name="phoneNumber"
            value={editUser.phoneNumber}
            onChange={handleChange}
            disableUnderline
            sx={{
              border: '1px solid black',
              padding: '5px 10px',
              borderRadius: '5px',
            }}
          />
          <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
