import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator, TouchableOpacity } from "react-native";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, logout, isLoggedIn, errorMessage } = useAuthStore();

  const handleLogin = async () => {
    if (username && password) {

      setLoading(true);
      try {
        await login(username, password);
        
      }finally {
        setLoading(false);
      }

     


    } else {
      Alert.alert("Please enter username and password");
    }
  };

  const handleLogout = () => {
    logout();
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome de Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome de usuário"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}  // Esconde o texto da senha
      />

      {/* Exibe a mensagem de erro se houver */}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      {!isLoggedIn && (
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                    disabled={loading} // Desabilita o botão durante o loading
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" /> // Exibe o indicador de carregamento
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>
            )}

            {isLoggedIn ? (
                <Button title="Logout" onPress={handleLogout} />
            ) : null}
    </View>
  );


}


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
});
