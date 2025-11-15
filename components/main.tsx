import * as Crypto from "expo-crypto";
import { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	useColorScheme,
	View,
} from "react-native";
import { theme } from "../src/theme";

export const MainContainer = () => {
	const [todo, setTodo] = useState("");
	const [todoItems, setTodoItems] = useState([
		{ id: "1", description: "Pick up groceries", completed: false },
	]);

	const colorScheme = useColorScheme();
	const inputTheme = colorScheme === "dark" ? styles.dark : styles.light;

	const addTodo = () => {
		if (!todo.trim()) return;

		setTodoItems((prev) => [
			...prev,
			{ id: Crypto.randomUUID(), description: todo.trim(), completed: false },
		]);
		setTodo("");
	};

	return (
		<View style={styles.mainContainer}>
			<TextInput
				style={[styles.input, inputTheme]}
				value={todo}
				onChangeText={setTodo}
				onSubmitEditing={addTodo}
				placeholder="Create a new todo..."
				placeholderTextColor={theme.colors.gray600}
			/>

			<View style={styles.listContainer}>
				{todoItems.map((item) => (
					<Text key={item.id}>{item.description}</Text>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		gap: theme.spacing.spacing200,
	},

	input: {
		color: theme.colors.gray600,
		borderRadius: 5,
		width: "100%",
		height: 48,
		paddingHorizontal: theme.spacing.spacing300,
		fontFamily: theme.typography.fontFamily.regular,
		fontSize: theme.typography.fontSize.xs,
	},

	dark: {
		backgroundColor: theme.colors.navy900,
	},

	light: {
		backgroundColor: theme.colors.white,
	},

	listContainer: {
		borderRadius: 5,
	},
});
