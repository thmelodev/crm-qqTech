import axios from "axios";
import { url_base } from "../routes";


class SistemaService {

  async listSystems(token) {
    const response = await axios({
      url: `${url_base}/sistema/all`,
      method: "GET",
      timeout: "5000",
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    });
    return response.data;
  }
}
const sistemaService = new SistemaService();
export default sistemaService;
