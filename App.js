import React, { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Keyboard} from "react-native"
// O SafeAreaView garante que nossa aplicação não fique sobre a statusbar, como acontece no iOS.

// Importando o Linear Gradient...
import LinearGradient from "react-native-linear-gradient"

// Importando nossa API...
import api from "./src/services/api"

export default function App() {
  // Criando as nossas useStates...
  // Criando um useState para armazenar e/ou alterar valor do CEP digitado...
  const [cep, setCep] = useState("")

  // Criando um useState para mostrar as informações do CEP buscado...
  const [cepEncontrado, setCepEncontrado] = useState(null)

  // Criando um useRef para usar o TextInput como referência -> caso o usuário tenha fechado o teclado ao limpar o input, queremos que o teclado volte à tela para ficar como referência...
  const inputRef = useRef(null)

  // Função de busca do CEP -> busca na API o CEP inserido no input...
  async function buscar() {
    // Verificando se o usuário digitou algo...
    // Se o CEP estiver vazio, mostra uma mensagem de erro...
    if(cep === "") {
      alert("Digite um CEP válido!")

      // Limpando o CEP...
      setCep("")

      return
    }

    try {
      // Buscando na API...
      // Usamos o método 'get' para buscar os dados da API. Nele, passamos a variável "cep" para ser o dado a ser buscado na API...
      const response = await api.get(`/${cep}/json`)

      /**
        *Teste para verificar se estamos obtendo alguma resposta da API...
        *Dentro de 'data' estão presentes os dados da API...
      */
      // console.log(response.data)

      // Substituindo as informações atuais pelas informações do CEP localizado...
      setCepEncontrado(response.data)

      // Fechando o teclado do usuário ao ser feito a busca...
      Keyboard.dismiss()  // Garante o fechamento do teclado
    } catch(erro) {
      console.log(`ERROR ${erro}!`)
    }
  }

  // Função de limpeza do input -> quando clicarmos no botão "Limpar", queremos que o input seja zerado...
  function limpar() {
    // Setamos o CEP para vazio...
    setCep("")

    // Setando o CEP encontrado...
    setCepEncontrado(null)

    // Chamando o inputRef...
    inputRef.current.focus()
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