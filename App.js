import React, { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Keyboard} from "react-native"

import LinearGradient from "react-native-linear-gradient"

import api from "./src/services/api"

export default function App() {
  const [cep, setCep] = useState("");
  const [cepEncontrado, setCepEncontrado] = useState(null);
  const inputRef = useRef(null);
  
  async function buscar() {
    if(cep === "") {
      alert("Digite um CEP válido!");
      setCep("");
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`);
      setCepEncontrado(response.data);     
      Keyboard.dismiss();
    } catch(erro) {
      console.log(`ERROR ${erro}!`)
    }
  }

  function limpar() {
    setCep("")
    setCepEncontrado(null);
    inputRef.current.focus();
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#2255DC", "#061161", "#780206"]} style={styles.container}>
        <Text style={styles.tituloPrincipal}>
          Localizador de CEP
        </Text>

        <View style={{alignItems: "center"}}>
          <Text style={styles.textInputCep}>
            Qual é o CEP desejado?
          </Text>

          <TextInput
            style={styles.cepInput}
            placeholder="Exemplo: 01234567"
            value={cep}
            onChangeText={(cepDigitado) => setCep(cepDigitado)}
            keyboardType="numeric"
            ref={inputRef}  // Foi passado o nosso useRef.
          />
        </View>

        <View style={styles.btnArea}>
          {/* Botão de busca... */}
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: "#2E8BC0"}]}
            onPress={buscar}
          >
            <Text style={styles.btnTexto}>
             Buscar CEP
            </Text>
          </TouchableOpacity>

          {/* Botão de limpeza... */}
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#870A30"}]}
            onPress={limpar}
          >
            <Text style={styles.btnTexto}>
              Limpar
            </Text>
          </TouchableOpacity>
        </View>

        {/*
          Criando uma renderização condicional, que irá mostrar as informações somente quando a busca não for nula...
        */}
        {cepEncontrado &&
          //  Criando um espaço para mostrar o resultado...
          <View style={styles.resultadoArea}>
            {/* CEP... */}
            <Text style={styles.textoResultado}>
              CEP: {cepEncontrado.cep}
            </Text>

            {/* Logradouro... */}
            <Text style={styles.textoResultado}>
              Logradouro: {cepEncontrado.logradouro}
            </Text>

            {/* Bairro... */}
            <Text style={styles.textoResultado}>
              Bairro: {cepEncontrado.bairro}
            </Text>

            {/* Cidade... */}
            <Text style={styles.textoResultado}>
              Cidade: {cepEncontrado.localidade}
            </Text>

            {/* Estado... */}
            <Text style={styles.textoResultado}>
              Estado: {cepEncontrado.uf}
            </Text>
          </View>
        }
      </LinearGradient>
    </SafeAreaView>
  )
}

// Espaço de estilos...
const styles = StyleSheet.create({
  // SafeAreaView, que abrange toda a parte visual do app...
  container:{
    flex: 1
  },

  tituloPrincipal:{
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 30,
    color: "#FFFFFF"
  },

  // Texto do input do CEP...
  textInputCep:{
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 15,
    color: "#FEA303"
  },

  // Input do CEP...
  cepInput:{
    fontSize: 16,
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#DDDDDD",
    backgroundColor: "#FFFFFF"
  },

  // Área dos botões...
  btnArea:{
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",  // Deixa os botões na MESMA LINHA.
    justifyContent: "space-around",  // Habilita um espaço entre os botões, evitando que fiquem grudados.
    marginTop: 15
  },

  // Botões...
  btn:{
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    height: 61,
    marginTop: 25,
    padding: 20,
    borderRadius: 5,
  },

  // Texto dos botões...
  btnTexto:{
    textAlign: "center",
    fontSize: 16,
    color: "#FFFFFF",
    paddingTop: 0.5
  },

  // Área do resultado...
  resultadoArea:{
    flex: 1, // Pega o resto do espaço da tela disponível.
    alignItems: "center",
    justifyContent: "center"
  },

  // Texto do resultado...
  textoResultado:{
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFD800"
  }
})
