import { StyleSheet, View } from "react-native";
import { theme } from "../src/theme";
import { Header } from "./header";
import { MainContainer } from "./main";

export const Container = () => {
	return (
		<View style={styles.container}>
			<Header></Header>
			<MainContainer></MainContainer>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: theme.spacing.spacing500,
		padding: theme.spacing.spacing300,
	},
});
