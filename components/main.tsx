import { Checkbox } from "expo-checkbox";
import * as Crypto from "expo-crypto";
import { Image } from "expo-image";
import { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";
import { theme } from "../src/theme";

export const MainContainer = () => {
	const [todo, setTodo] = useState("");
	const [todoItems, setTodoItems] = useState([
		{ id: "", description: "", completed: false },
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

			<View style={[styles.listContainer, inputTheme]}>
				{todoItems.map((item) => {
					if (item.id === "") return null;

					return (
						<View key={item.id}>
							<View style={styles.itemContainer}>
								<Checkbox value={item.completed} />
								<Text style={styles.todoText}>{item.description}</Text>
								<TouchableOpacity
									onPress={() =>
										setTodoItems((prev) => prev.filter((t) => t.id !== item.id))
									}
								>
									<Image
										source={require("../assets/images/icon-cross.svg")}
										style={styles.image}
									/>
								</TouchableOpacity>
							</View>
							<View style={styles.horizontalLine} />
						</View>
					);
				})}
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
		paddingTop: theme.spacing.spacing300,
		borderRadius: 5,
		paddingHorizontal: theme.spacing.spacing300,
	},

	todoText: {
		color: theme.colors.purple100,
		fontFamily: theme.typography.fontFamily.regular,
		fontSize: theme.typography.fontSize.xs,
	},

	itemContainer: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		justifyContent: "space-between",
	},

	image: {
		height: 10,
		width: 24,
	},

	horizontalLine: {
		borderBottomColor: "#bbb",
		borderBottomWidth: 1,
		marginVertical: 10,
	},
});
