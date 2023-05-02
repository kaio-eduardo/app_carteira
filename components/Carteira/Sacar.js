import { Alert, StyleSheet, Text, View } from "react-native";
import InputField from "../common/InputField";
import SubmitBtn from "../common/SubmitBtn";
import ResetBtn from "../common/ResetBtn";
import { useContext, useState } from "react";

import isNumeric from "../../utils/isNumeric";
import { CarteiraContext } from "../../context/Carteira";

const Sacar = ({ id, carteira }) => {
  const [saque, setSacar] = useState("");
  const { withdraw, date } = useContext(CarteiraContext);

  const clearFields = () => {
    setSacar("");
  };

  const handleSubmit = () => {
    if (!isNumeric(saque) || saque <= 0) {
      Alert.alert("Campo invalido", "Você não pode Sacar nada");
      return;
    }

    if (+carteira.saldo < +saque) {
      Alert.alert("Campo invalido", "Você não pode Sacar mais do que tem");
      return;
    }

    if (+carteira.limite < +saque) {
      Alert.alert("Campo invalido", "Você não pode Sacar mais do que seu limite");
      return;
    }

    console.log(date.getHours() > 18);
    if (date.getHours() < 8 || date.getHours() > 18) {
      Alert.alert("Desativado", "Saques não ocorrem às " + date.getHours());
      return;
    }

    withdraw(id, saque)
    Alert.alert("Ok!", "Saque realizado com sucesso");
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Faça um saque</Text>
      <Text>limite: R$ { carteira.limite },00</Text>
      <View style={{ width: "100%" }}>
        <InputField
          type="decimal-pad"
          value={saque}
          setValue={setSacar}
          placeholder="Digite um valor para sacar"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            gap: 5,
          }}
        >
          <ResetBtn handleClear={clearFields} text="Limpar" />
          <SubmitBtn handleSubmit={handleSubmit} text="Sacar" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
});

export default Sacar;
