import { View, TextInput, StyleSheet } from "react-native";

const InputField = ({ placeholder, value, setValue, type="default" }) => (
    <View style={styles.inputWrapper}>
      <TextInput keyboardType={type} value={value} onChangeText={(text) => setValue(text)}  style={styles.formInput} placeholder={placeholder} />
    </View>
  );

  const styles = StyleSheet.create({
    inputWrapper: {
        flex: 1,
        backgroundColor: "white",
        marginRight: 12,
        marginTop: 12,
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: 16,
        height: "100%",
      },
      formInput: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 16,
        paddingVertical: 12,
      },
  })

export default InputField