import axios from "axios";
import { url_base } from "../routes";

class ColaboradorService {

  async findOne(username,token) {
    const response = await axios({
      url: `${url_base}/colaborador?matricula=${username}`,
      method: "GET",
      timeout: "5000",
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    });
    return response;
  }
}
const colaboradorService = new ColaboradorService();
export default colaboradorService;
