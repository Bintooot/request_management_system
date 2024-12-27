import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Letter from "../../components/Form/Letter";

const CustomModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClick={handleClose}>
      <Box className="absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 w-1/2  bg-white p-10 rounded-lg">
        <Letter />
      </Box>
    </Modal>
  );
};

export default CustomModal;
