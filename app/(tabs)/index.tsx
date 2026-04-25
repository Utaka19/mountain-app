import { useState } from "react";
import { Button, TextInput } from "react-native";
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

      <Button title="保存" onPress={() => {}} />
    </SafeAreaView>
  );
}
