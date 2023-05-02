import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ResetBtn = ({ text, handleClear }) => (
  <TouchableOpacity onPress={handleClear} style={styles.submitBtn}>
    <Text style={styles.submitBtnText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  submitBtn: {
    marginTop: 16,
    flex: 1,
    height: 45,
    backgroundColor: "gray",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: {
    fontSize: 16,
    color: "white",
  },
});

export default ResetBtn;