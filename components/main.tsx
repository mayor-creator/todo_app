import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import * as Crypto from "expo-crypto";
import { Image } from "expo-image";
import { useCallback, useEffect, useState } from "react";
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	useColorScheme,
	View,
} from "react-native";
import { theme } from "../src/theme";

type TodoItems = {
	id: string;
	description: string;
	completed: boolean;
};

export const MainContainer = () => {
	const [todo, setTodo] = useState("");
	const [todoItems, setTodoItems] = useState<TodoItems[]>([]);
	const [filterItems, setFilterItems] = useState<
		"all" | "active" | "completed"
	>("all");

	const colorScheme = useColorScheme();
	const inputTheme = colorScheme === "dark" ? styles.dark : styles.light;
	const textTheme =
		colorScheme === "dark" ? styles.darkTextColor : styles.lightTextColor;

	const addTodo = () => {
		if (!todo.trim()) return;

		setTodoItems((prev) => [
			...prev,
			{ id: Crypto.randomUUID(), description: todo.trim(), completed: false },
		]);
		setTodo("");
	};

	const removeTodo = (id: string) => {
		setTodoItems((prev) => prev.filter((item) => item.id !== id));
	};

	const countActiveItems = todoItems.filter((item) => !item.completed).length;

	const toggleItemCompletion = (id: string) => {
		setTodoItems((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, completed: !item.completed } : item,
			),
		);
	};

	const clearItemCompleted = () => {
		setTodoItems((prev) => prev.filter((item) => !item.completed));
	};

	const filterTodos = todoItems.filter((item) => {
		if (filterItems === "active") return !item.completed;
		if (filterItems === "completed") return item.completed;
		return true;
	});

	const saveTodos = useCallback(async () => {
		try {
			await AsyncStorage.setItem("todos", JSON.stringify(todoItems));
		} catch (error) {
			console.error("Error saving todos:", error);
		}
	}, [todoItems]);

	const loadTodos = useCallback(async () => {
		try {
			const savedTodos = await AsyncStorage.getItem("todos");
			if (savedTodos) {
				setTodoItems(JSON.parse(savedTodos));
			}
		} catch (error) {
			console.error("Error loading todos:", error);
		}
	}, []);

	useEffect(() => {
		loadTodos();
	}, [loadTodos]);

	useEffect(() => {
		saveTodos();
	}, [saveTodos]);

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
				<FlatList
					data={filterTodos}
					keyExtractor={(item) => item.id}
					ItemSeparatorComponent={() => <View style={styles.horizontalLine} />}
					renderItem={({ item }) => (
						<View style={styles.itemContainer}>
							<View style={styles.checkTextContainer}>
								<Checkbox
									value={item.completed}
									onValueChange={() => toggleItemCompletion(item.id)}
								/>
								<Text style={[styles.todoText, textTheme]}>
									{item.description}
								</Text>
							</View>

							<Pressable onPress={() => removeTodo(item.id)}>
								<Image
									source={require("../assets/images/icon-cross.svg")}
									style={styles.image}
								/>
							</Pressable>
						</View>
					)}
				/>
			</View>

			<View style={[styles.actionContainer, inputTheme]}>
				<Text style={[styles.todoText, textTheme]}>
					{countActiveItems} items left
				</Text>
				<Text style={[styles.todoText, textTheme]} onPress={clearItemCompleted}>
					Clear Completed
				</Text>
			</View>

			<View style={[styles.actionContainer, inputTheme]}>
				<Pressable onPress={() => setFilterItems("all")}>
					<Text style={[styles.todoText, textTheme]}>All</Text>
				</Pressable>

				<Pressable onPress={() => setFilterItems("active")}>
					<Text style={[styles.todoText, textTheme]}>Active</Text>
				</Pressable>

				<Pressable onPress={() => setFilterItems("completed")}>
					<Text style={[styles.todoText, textTheme]}>Completed</Text>
				</Pressable>
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
		paddingBottom: theme.spacing.spacing300,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 3,
	},

	todoText: {
		fontFamily: theme.typography.fontFamily.regular,
		fontSize: theme.typography.fontSize.xs,
	},

	itemContainer: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: theme.spacing.spacing300,
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

	checkTextContainer: {
		gap: 10,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 5,
	},

	actionContainer: {
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: theme.spacing.spacing300,
		alignItems: "center",
		height: 50,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 1,
	},

	darkTextColor: {
		color: theme.colors.purple100,
	},

	lightTextColor: {
		color: theme.colors.navy850,
	},
});
