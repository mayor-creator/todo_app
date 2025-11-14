import { StatusBar } from "expo-status-bar";
import { StyleSheet, useColorScheme, View } from "react-native";
import { ThemeBackgroundScreen } from "@/components/themedBackgroundScreen";
import { theme } from "../src/theme";

export default function Index() {
	const colorScheme = useColorScheme();

	const themeContainerBackground =
		colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

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
