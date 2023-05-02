import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { CarteiraContext } from "../context/Carteira";

const ListCarteirasScreen = ({ navigation }) => {

  const { carteiras } = useContext(CarteiraContext)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16, paddingBottom: 40 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Todas as carteiras</Text>
        </View>

        <View style={styles.cardContainer}>
          <FlatList
            data={carteiras}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.container}
                onPress={() =>
                  navigation.navigate("Carteira", { id: item.id })
                }
              >
                <View style={styles.detailContainer}>
                  <Text>Dono: { item.nome }</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Carteira", { id: item.id })
                    }
                    style={styles.accessBtn}
                  >
                    <Text style={styles.accessBtnText}>Acessar</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.carteiraSaldo}>Saldo: R$ {item.saldo}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item?.id}
            contentContainerStyle={{ rowGap: 16 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFF",
  },
  carteiraSaldo: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "bold",
  },
  detailContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accessBtnText: {
    fontSize: 16,
    color: "#312651",
  },
  accessBtn: {
    backgroundColor: "#FF7754",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  cardContainer: {
    gap: 12,
    marginTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#312651",
  },
});

export default ListCarteirasScreen;
