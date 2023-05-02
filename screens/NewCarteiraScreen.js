import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import InputField from "../components/common/InputField";
import { useContext, useEffect, useRef, useState } from "react";

import { v4 as uuidV4 } from "uuid"
import * as Crypto from 'expo-crypto';

import isNumeric from "../utils/isNumeric";
import { CarteiraContext } from "../context/Carteira";

const generateUUID = async () => {
  const randomBytes = await Crypto.getRandomBytesAsync(10)
  return uuidV4(randomBytes);
}

const NewCarteiraCadastroScreen = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [depositar, setDepositar] = useState("");

  const [success, setSuccess] = useState(false)
  const timer = useRef()

  const { addCarteira, carteiras } = useContext(CarteiraContext)

  const clearFields = () => {
    setName("");
    setCpf("");
    setDepositar("");
  };

  useEffect(() => {
    const setInterval = () => {
      return setTimeout(() => {
        setSuccess(false)
      }, 1000)
    }
    if (success === true) {
      timer.current = setInterval()
    }

    return () => {
      clearTimeout(timer.current)
    }
  }, [success])

  const handleSubmit = async () => {
    console.log(name);

    if (name === "" || cpf === "" || depositar === "") {
      Alert.alert(
        "Valores vazios",
        "Nenhum valor pode ser vazio ao cadastrar uma nova carteira"
      );
      return;
    }

    if (name.length <= 2) {
      Alert.alert("Campo negado", "Nome precisa tem mais de 2 letras");
      return;
    }

    if (!isNumeric(depositar) || depositar <= 0) {
      Alert.alert(
        "Campo negado",
        "Depositar tem que ser um número maior que 0"
      );
      return;
    }

    const carteira = carteiras.filter(carteira => carteira.nome.toLowerCase() === name.trim().toLowerCase())
    if (carteira[0]) {
      Alert.alert(
        "Campo negado",
        "Essa pessoa já possui uma carteira"
      );
      return
    }

    const uuid = await generateUUID()

    const newCarteira = {
      id: uuid,
      nome: name.trim(),
      cpf: cpf,
      saldo: depositar,
      limite: depositar * 0.1,
      tarifa: { month: 0 }
    }

    addCarteira(newCarteira)
    setSuccess(true)
  };

  return (
    <SafeAreaView>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{ flex: 1, padding: 16 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Registrar nova carteira</Text>
          </View>

          <View>
            <InputField
              value={name}
              setValue={setName}
              placeholder="Nome do dono"
            />
            <InputField
              type="numeric"
              value={cpf}
              setValue={setCpf}
              placeholder="CPF"
            />
            <InputField
              type="decimal-pad"
              value={depositar}
              setValue={setDepositar}
              placeholder="Depósito"
            />
            { success ? (<View style={{ width: "100%" }}>
              <Text>Cadastrado com sucesso</Text>
            </View>) : (
              <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity onPress={clearFields} style={styles.clearBtn}>
                <Text style={styles.clearBtnText}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.registerBtn}
              >
                <Text style={styles.registerBtnText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
            ) }            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 24,
    color: "#312651",
    marginTop: 2,
  },
  registerBtn: {
    marginTop: 16,
    width: 100,
    height: 50,
    backgroundColor: "#FF7754",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  registerBtnText: {
    fontSize: 16,
    color: "#312651",
  },
  clearBtn: {
    marginTop: 16,
    width: 100,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  clearBtnText: {
    fontSize: 16,
    color: "white",
  },
});

export default NewCarteiraCadastroScreen;
