import { useContext, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CarteiraContext } from "../context/Carteira";

import DateTimePicker from "@react-native-community/datetimepicker";

const AdminScreen = () => {
  const { tarifa } = useContext(CarteiraContext);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const { changeDate, date } = useContext(CarteiraContext)

  const HandleTarifa = () => {
    Alert.alert("Tarifa", "A tarifa foi cobrada com sucesso");
    tarifa();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    changeDate(currentDate);
  };

  const ShowDatePicker = () => {
    setShow(true)
    setMode("date")
  }

  const ShowTimePicker = () => {
    setShow(true)
    setMode("time")
  }

  console.log(date);

  return (
    <SafeAreaView>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{ flex: 1, padding: 16 }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.username}>Olá Admin</Text>
            <Text style={styles.welcomeMessage}>Configure a plataforma</Text>
          </View>
          <View>
            <TouchableOpacity onPress={HandleTarifa} style={styles.tarifaBtn}>
              <Text style={styles.tarifaBtnText}>Gerar cobrança da tarifa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={ShowDatePicker}
              style={styles.dateBtn}
            >
              <Text style={styles.dateBtnText}>
                Alterar Data
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={ShowTimePicker}
              style={styles.dateBtn}
            >
              <Text style={styles.dateBtnText}>
                Alterar Hora
              </Text>
            </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker 
              testID="dateTimePicker2"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tarifaBtn: {
    marginTop: 16,
    height: 50,
    backgroundColor: "#FF7754",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  tarifaBtnText: {
    fontSize: 16,
    color: "#312651",
  },
  dateBtn: {
    marginTop: 16,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444262",
  },
  dateBtnText: {
    color: "white",
    fontSize: 16,
  },
  username: {
    fontSize: 20,
    color: "#444262",
  },
  welcomeMessage: {
    fontSize: 24,
    color: "#312651",
    marginTop: 2,
  },
});

export default AdminScreen;
