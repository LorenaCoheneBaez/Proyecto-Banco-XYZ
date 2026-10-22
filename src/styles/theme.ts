import { StyleSheet } from "react-native";

export const colors = {
  primary: "#0056b3",
  background: "#f4f6f9",
  card: "#ffffff",
  text: "#333333",
  textLight: "#777777",
  danger: "#e74c3c",
  success: "#2ecc71",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
