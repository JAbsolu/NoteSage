"use client";

import {
  Modal,
  Box,
  Alert,
  AlertTitle,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { getCookie } from '@/util/cookies';
import { useEffect, useState } from 'react';
import { grey } from '@mui/material/colors';

const getSeverity = (text) => {
  const lower = text.toLowerCase();
  if (lower.includes("error") || lower.includes("problem") || lower.includes("server")) return 'error';
  if (lower.includes("finished") || lower.includes("well done")) return 'success';
  if (lower.includes("friend") || lower.includes("request")) return 'info';
  if (lower.includes("mail") || lower.includes("warn")) return 'warning';
  return 'info';
};

export default function NotificationsModal({ open, onClose, notifications, loading }) {

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        bgcolor: 'background.paper',
        p: 2,
        borderRadius: 2,
        maxWidth: 300,
        maxHeight: 600,
        overflowY: "auto",
        scrollbarWidth: "none",  // For Firefox
        "&::-webkit-scrollbar": { display: "none" },  // For Chrome, Safari
        ml: 20,
        mt: 9,
      }}>
        <Typography variant="h6" className='text-black' mb={1}>Notifications</Typography>
        {loading ? (
          <Box display="flex" justifyContent="center"><CircularProgress /></Box>
        ) : notifications.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No notifications found.
          </Typography>
        ) : (
          notifications.map((msg, i) => (
            <NotificationItem key={i} message={msg} />
          ))
        )}
      </Box>
    </Modal>
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
      sx={{ mb: 1, py: 0.5}}
    >
      <AlertTitle mb={0} fontSize="10.5pt">Notification</AlertTitle>
      <Typography fontSize="9pt" color={grey[800]}>{message}</Typography>
    </Alert>
  );
}
