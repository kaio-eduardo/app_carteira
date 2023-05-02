import { StyleSheet, Text, TouchableOpacity } from "react-native";

const SubmitBtn = ({ text, handleSubmit }) => (
  <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
    <Text style={styles.submitBtnText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  submitBtn: {
    marginTop: 16,
    flex: 1,
    height: 45,
    backgroundColor: "#FF7754",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: {
    fontSize: 16,
    color: "#312651",
  },
});

export default SubmitBtn;
