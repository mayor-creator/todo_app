import {
	ImageBackground,
	StyleSheet,
	useColorScheme,
	View,
} from "react-native";
import { Container } from "./container";

export const ThemeBackgroundScreen = () => {
	const colorScheme = useColorScheme();

	const backgroundImage =
		colorScheme === "dark"
			? require("../assets/images/bg-mobile-dark.jpg")
			: require("../assets/images/bg-mobile-light.jpg");

	return (
		<View style={styles.wrapper}>
			<ImageBackground source={backgroundImage} style={styles.backgroundImage}>
				<Container />
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
	},

	backgroundImage: {
		resizeMode: "cover",
		width: "100%",
		aspectRatio: 375 / 200,
	},
});
