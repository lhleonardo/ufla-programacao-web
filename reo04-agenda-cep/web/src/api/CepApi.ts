import axios from "axios";

export interface ICepApiResponse {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

const CEP_URL: string = "https://brasilapi.com.br/api/cep/v1";

const axiosClient = axios.create({
  baseURL: CEP_URL,
});

class CepAPI {
  async search(data: string): Promise<ICepApiResponse | null> {
    try {
      const response = await axiosClient.get<ICepApiResponse>(data);
      return response.data;
    } catch {
      return null;
    }
  }
}

export default new CepAPI();
