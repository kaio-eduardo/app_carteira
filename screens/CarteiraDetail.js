import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView, Text } from "react-native";
import Sacar from "../components/Carteira/Sacar";
import Depositar from "../components/Carteira/Depositar";
import Transferir from "../components/Carteira/Transferir";

import { CarteiraContext } from "../context/Carteira";

const AccountDetails = ({ carteira }) => {
  return (
    <View style={styles.container}>
      <View style={styles.saldoBox}>
        <Text>Saldo atual: {carteira.saldo}</Text>
        <Text style={styles.saldoText}>R$ {carteira.saldo}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.accountNumber}> {carteira.id} </Text>
        <Text style={styles.accountName}> {carteira.nome}</Text>
      </View>
    </View>
  );
};

const TabButton = ({ name, setActiveTab }) => {
  return (
    <TouchableOpacity onPress={() => setActiveTab(name)} style={styles.btn}>
      <Text style={styles.btnText}>{name}</Text>
    </TouchableOpacity>
  );
};

const Tabs = ({ tabs, setActiveTab }) => {
  return (
    <View style={styles.tabContainer}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton setActiveTab={setActiveTab} name={item} />
        )}
        contentContainerStyle={{ columnGap: 5 }}
        horizontal
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const CarteiraDetail = ({ route, navigation }) => {
  const { carteiras, withdraw, deposit } = useContext(CarteiraContext);

  const { id } = route.params;

  const carteira = carteiras.find((carteira) => carteira.id === id);

  const [activeTab, setActiveTab] = useState("Sacar");

  const displayTabContent = () => {
    switch (activeTab) {
      case "Sacar":
        return <Sacar id={carteira.id} carteira={carteira} />;

      case "Depositar":
        return <Depositar id={carteira.id} carteira={carteira} />;

      case "Transferir":
        return <Transferir carteira={carteira} />;

      default:
        return null;
    }
  };

  return (
    <SafeAreaView>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{ padding: 16, paddingBottom: 100 }}>
          {carteira ? (
            <>
              <AccountDetails carteira={carteira} />
              <Tabs
                tabs={["Sacar", "Depositar", "Transferir"]}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    marginTop: 12,
    marginBottom: 4,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: "#FF7754",
    borderRadius: 16,
    marginLeft: 2,
  },
  btnText: {
    fontWeight: "500",
    fontSize: 12,
    color: "#312651",
  },
  accountNumber: {
    fontSize: 14,
    color: "#83829A",
    fontWeight: "500",
  },
  accountName: {
    fontSize: 14,
    color: "#312651",
    fontWeight: "500",
  },
  infoBox: {
    marginTop: 6,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  saldoBox: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 24,
  },
  saldoText: {
    fontSize: 24,
    color: "#312651",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CarteiraDetail;
