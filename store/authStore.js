import { create } from "zustand";
import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const useAuthStore = create((set) => ({
    isLoggedIn: false,
    username: "",
    password: "",
    token: "",
    errorMessage: "",


    login: async (username, password) => {

        try {
            const loginResponse = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                credentials: 'include' // Include cookies (e.g., accessToken) in the request
            });

            const loginData = await loginResponse.json();

            if (loginResponse.ok && loginData.accessToken) {
                set({ token: loginData.accessToken });

                const userResponse = await fetch('https://dummyjson.com/auth/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${loginData.accessToken} `, // Pass JWT via Authorization header
                    },
                    credentials: 'include' // Include cookies (e.g., accessToken) in the request
                });

                const userData = await userResponse.json();

                if (userResponse.ok && userData.username) {
                    set({ isLoggedIn: true });
                    set({ errorMessage: "" });
                } else {
                    throw new Error("Erro ao realizar login");
                }
            } else {
                set({ errorMessage: "Credenciais Inválidas" });
            }

        } catch (error) {
            set({ errorMessage: "Erro ao realizar login" + error.message });
        }


        // try {
        //     fetch('https://dummyjson.com/auth/login', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({

        //             username: username,
        //             password: password,

        //         }),
        //         credentials: 'include' // Include cookies (e.g., accessToken) in the request
        //     })
        //         .then(res => res.json())
        //         .then(
        //             (result) => {

        //                 if (result.accessToken) {


        //                     set({ token: result.accessToken });

        //                     fetch('https://dummyjson.com/auth/me', {
        //                         method: 'GET',
        //                         headers: {
        //                             'Authorization': `Bearer ${result.accessToken} `, // Pass JWT via Authorization header
        //                         },
        //                         credentials: 'include' // Include cookies (e.g., accessToken) in the request
        //                     })
        //                         .then(res => res.json())
        //                         .then(
        //                             (result) => {
        //                                 // console.log("result", result);
        //                                 if (result.username) {
        //                                     set({ isLoggedIn: true });
        //                                 }
        //                             }
        //                         );

        //                     } else {
        //                         //adicionar exception
        //                         set({ errorMessage: "Credenciais Inválidas" });
        //                     }

        //             }
        //         );
        // } catch (error) {
        //     set({ errorMessage: "Erro ao realizar login" });
        // }


    },


    logout: () => {
        set({ token: "", isLoggedIn: false, errorMessage: "", username: "" });
    },
    setErrorMessage: (message) => set({ errorMessage: message }),


}));

export default useAuthStore;


