import { View, Text, StyleSheet, Alert } from "react-native"
import InputField from "../common/InputField"
import SubmitBtn from "../common/SubmitBtn"
import ResetBtn from "../common/ResetBtn"
import { useContext, useState } from "react"

import isNumeric from "../../utils/isNumeric"
import { CarteiraContext } from "../../context/Carteira"

const Depositar = ({ id, carteira }) => {

    const [depositar, setDepositar] = useState("");
    const { deposit, date } = useContext(CarteiraContext)

    const clearFields = () => {
        setDepositar("");
    };

    const handleSubmit = () => {
        if (!isNumeric(depositar) || depositar <= 0) {
            Alert.alert("Campo invalido", "Você não pode depositar nada")
            return
        }

        if (date.getHours() < 8 || date.getHours() > 18) {
            Alert.alert("Desativado", "Depósitos não ocorrem às " + date.getHours());
            return;
        }

        deposit(id, depositar)
        Alert.alert("Ok!", "Depósito realizado com sucesso") 
    }

    return (
        <View style={{ flex: 1 }}>
        <Text style={styles.title}>Faça um depósito</Text>
        <View style={{ width: "100%" }}>
            <InputField type="decimal-pad" value={depositar} setValue={setDepositar} placeholder="Digite um valor para depositar" />
            <View style={{ flexDirection: "row", justifyContent: "space-around", gap: 5 }}>
            <ResetBtn handleClear={clearFields} text="Limpar" />
            <SubmitBtn handleSubmit={handleSubmit} text="Depositar" />
            </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 10
    }
})

export default Depositar