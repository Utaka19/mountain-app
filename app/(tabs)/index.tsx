import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Mountain = {
  id: string;
  name: string; // 山の名前
  height: string; // 標高
  date: string; // 登った日
};

export default function Index() {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [mountains, setMountains] = useState<Mountain[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const addMountain = () => {
    if (!name) return;
    if (!height) return;
    if (isNaN(Number(height))) return;

    const newMountain: Mountain = {
      id: Date.now().toString(),
      name,
      height,
      date: new Date().toLocaleDateString(),
    };

    setMountains((prev) => [newMountain, ...prev]);

    setName("");
    setHeight("");
  };

  const deleteMountain = (id: string) => {
    setMountains((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem("mountains");

      console.log("ロード:", data);

      if (data !== null) {
        setMountains(JSON.parse(data));
      }

      setIsLoaded(true);
    };

    load();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    console.log("保存:", mountains);
    const save = async () => {
      await AsyncStorage.setItem("mountains", JSON.stringify(mountains));
    };

    save();
  }, [mountains, isLoaded]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
      <TextInput
        placeholder="山の名前"
        value={name}
        onChangeText={setName}
        style={{ color: "white", borderWidth: 1, marginBottom: 10 }}
        placeholderTextColor="gray"
      />

      <TextInput
        placeholder="標高 (m)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        style={{ color: "white", borderWidth: 1, marginBottom: 10 }}
        placeholderTextColor="gray"
      />

      <Button title="保存" onPress={addMountain} />

      <FlatList
        data={mountains}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{ padding: 10, borderBottomWidth: 1, borderColor: "gray" }}
          >
            <Text style={{ color: "white" }}>{item.date}</Text>
            <Text style={{ color: "white" }}>{item.name}</Text>
            <Text style={{ color: "white" }}>
              {Number(item.height).toFixed(0)} m
            </Text>

            <Button title="削除" onPress={() => deleteMountain(item.id)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
