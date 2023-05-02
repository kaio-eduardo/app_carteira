import { View, Text, StyleSheet, Alert } from "react-native";
import InputField from "../common/InputField";
import SubmitBtn from "../common/SubmitBtn";
import ResetBtn from "../common/ResetBtn";
import { useContext, useState } from "react";

import isNumeric from "../../utils/isNumeric";
import { CarteiraContext } from "../../context/Carteira";

const Transferir = ({ carteira }) => {
  const [destiny, setDestiny] = useState("");
  const [transferir, setTransferir] = useState("");
  const [cpfDigits, setCpfDigits] = useState("")

  const { carteiras, transfer, withdraw } = useContext(CarteiraContext);

  const clearFields = () => {
    setDestiny("");
    setTransferir("");
  };

  const handleSubmit = () => {
    if (!isNumeric(transferir) || transferir <= 0) {
      Alert.alert("Campo invalido", "Você não pode transferir nada");
      return;
    }

    if (transferir > 1000 && cpfDigits != carteira.cpf.slice(0, 3)) {
        Alert.alert("Campo invalido", "Para transferir R$ 1000 é necessario os 3 digitos do cpf")
        return
    } 

    if (+carteira.saldo < +transferir) {
      Alert.alert(
        "Campo invalido",
        "Você não pode transferir mais do que seu saldo"
      );
      return;
    }

    let formatDestiny = destiny.trim().toLowerCase();

    const carteiraDestiny = carteiras.filter(
      (_carteira) =>
        _carteira.nome.toLowerCase() === formatDestiny &&
        _carteira.nome.toLowerCase() !== carteira.nome.toLowerCase()
    );
    if (!carteiraDestiny[0]) {
      Alert.alert("Destino invalido", "Esse destino não existe");
      return;
    }

    console.log(
      carteiras.map((carteira) =>
        carteira.nome.toLowerCase() === formatDestiny
          ? { ...carteira, saldo: carteira.saldo + +1000 }
          : carteira
      )
    );

    withdraw(carteira.id, transferir);
    transfer(formatDestiny, transferir);
    Alert.alert(
      "Transferencia realizada",
      "Você transferiu um valor de R$ " +
        transferir +
        ",00 para " +
        formatDestiny
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Faça uma transferência</Text>
      <View style={{ width: "100%" }}>
        <InputField
          value={destiny}
          setValue={setDestiny}
          placeholder="Quem irá receber?"
        />
        <InputField
          type="decimal-pad"
          value={transferir}
          setValue={setTransferir}
          placeholder="Digite um valor para Transferir"
        />
        {transferir > 1000 && (
          <InputField
            type="decimal-pad"
            value={cpfDigits}
            setValue={setCpfDigits}
            placeholder="Digite os 3 primeiros num do cpf"
          />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            gap: 5,
          }}
        >
          <ResetBtn handleClear={clearFields} text="Limpar" />
          <SubmitBtn handleSubmit={handleSubmit} text="Transferir" />
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

export default Transferir;
