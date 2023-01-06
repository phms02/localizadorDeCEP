/**
  *URL da API: https://viacep.com.br/ws/79560000/json
  *baseURL: https://viacep.com.br/ws
  *Rota: 79560000/json
*/

// Importando o Axios (para fazer requisições HTTP)...
import axios from "axios"

// Criando a baseURL...
const api = axios.create({
    baseURL: "https://viacep.com.br/ws"
})

// Exportando a nossa API...
export default api