const styles = () => ({
  listItem: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textSection: {
    maxWidth: "85%",
  },
  deleteIcon: {
    position: "absolute",
    right: "5px",
    top: "calc(50% - 15px)",
    "&:hover": {
      color: "red",
    },
  },
});

export default styles;
