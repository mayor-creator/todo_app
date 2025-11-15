import { StyleSheet, Text } from "react-native";
import { theme } from "../src/theme";

export const Header = () => {
	return <Text style={styles.title}>TO DO</Text>;
};

const styles = StyleSheet.create({
	title: {
		marginTop: 40,
		color: theme.colors.white,
		fontFamily: theme.typography.fontFamily.bold,
		fontSize: theme.typography.fontSize.xxl,
	},
});
