import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import { clearNotification } from '../redux/slice/notificationSlice';
export default function Notification () {
  const { message, type, visible } = useSelector((state) => state.notification);
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    setOpen(true)
    setTimeout(() => {
        dispatch(clearNotification())
        setOpen(false)
    }, 2000)
  }, [dispatch, message, type, visible])
  return (
    visible &&
      <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            variant="filled"
            onClose={() => setOpen(false)}
            severity={type ?? "error"}
          >
            {message}
          </Alert>
        </Snackbar>
  );
};

