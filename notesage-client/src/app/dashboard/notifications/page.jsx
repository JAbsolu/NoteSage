"use client";
 
import {

  Alert,

  AlertTitle,

  Box,

  Card,

  CardHeader,

  CardContent,

  Grid,

  IconButton,

  CircularProgress,

  Typography,

} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import { getCookie } from '@/util/cookies';

import { useEffect, useState } from 'react';
 
const getSeverity = (text) => {

  const lower = text.toLowerCase();

  if (lower.includes("error") || lower.includes("problem") || lower.includes("server")) return 'error';

  if (lower.includes("finished") || lower.includes("well done")) return 'success';

  if (lower.includes("friend") || lower.includes("request")) return 'info';

  if (lower.includes("mail") || lower.includes("warn")) return 'warning';

  return 'info';

};
 
export default function Notifications() {

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  const userId = getCookie("userId");
 
  useEffect(() => {

    fetch(`http://localhost/notifications?id=${userId}`)

      .then((res) => res.json())

      .then((data) => {

        console.log("API response:", data);

        const notificationList = data?.data?.[0]?.notifications || [];

        setNotifications(notificationList);

        setLoading(false);

      })

      .catch((error) => {

        console.error("Failed to fetch notifications", error);

        setNotifications([]);

        setLoading(false);

      });

  }, []);
 
  return (
<Box sx={{ mt: 4, px: 2 }}>
<Grid container spacing={4} justifyContent="center">
<Grid item xs={12} md={6}>
<Card variant="outlined">
<CardHeader

              title="Notifications"

              sx={{ bgcolor: '#fcfcfc', borderBottom: '1px solid #ddd' }}

            />
<CardContent>

              {loading ? (
<Box display="flex" justifyContent="center">
<CircularProgress />
</Box>

              ) : notifications.length === 0 ? (
<Typography variant="body2" color="text.secondary">

                  No notifications found.
</Typography>

              ) : (

                notifications.map((msg, i) => (
<NotificationItem key={i} message={msg} />

                ))

              )}
</CardContent>
</Card>
</Grid>
</Grid>
</Box>

  );

}
 
function NotificationItem({ message }) {

  const [open, setOpen] = useState(true);

  const severity = getSeverity(message);
 
  if (!open) return null;
 
  return (
<Alert

      severity={severity}

      icon={<NotificationsActiveIcon />}

      action={
<IconButton size="small" onClick={() => setOpen(false)}>
<CloseIcon fontSize="inherit" />
</IconButton>

      }

      sx={{ mb: 2 }}
>
<AlertTitle>Notification</AlertTitle>

      {message}
</Alert>

  );

}