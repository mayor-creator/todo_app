import { ImageBackground, StyleSheet, useColorScheme } from "react-native";

export const ThemeBackgroundScreen = () => {
	const colorScheme = useColorScheme();

	const backgroundImage =
		colorScheme === "dark"
			? require("../assets/images/bg-mobile-dark.jpg")
			: require("../assets/images/bg-mobile-light.jpg");

	return (
		<ImageBackground
			source={backgroundImage}
			style={styles.backgroundImage}
		></ImageBackground>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		resizeMode: "cover",
		justifyContent: "center",
		height: 200,
	},
});
