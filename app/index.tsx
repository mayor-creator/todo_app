import { ThemeBackgroundScreen } from "@/components/themedBackgroundScreen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, useColorScheme, View } from "react-native";
import { theme } from "../src/theme";

export default function Index() {
	const [fontsLoaded] = useFonts({
		JosefinSans_400Regular: require("../assets/fonts/JosefinSans-Regular.ttf"),
		JosefinSans_600Bold: require("../assets/fonts/JosefinSans-Bold.ttf"),
	});

	const colorScheme = useColorScheme();

	const themeContainerBackground =
		colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

	if (!fontsLoaded) return null;

	return (
		<View style={[styles.container, themeContainerBackground]}>
			<StatusBar style="auto"></StatusBar>
			<ThemeBackgroundScreen />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	lightContainer: {
		backgroundColor: theme.colors.white,
	},

	darkContainer: {
		backgroundColor: theme.colors.navy950,
	},
});
