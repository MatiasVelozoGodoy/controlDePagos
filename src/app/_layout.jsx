import { Stack } from "expo-router";

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="historial" options={{ headerShown: false }} />
      
    </Stack>
  );
};

export default RootNavigation;
