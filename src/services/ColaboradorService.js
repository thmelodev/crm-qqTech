import axios from "axios";
import { url_base } from "../routes";

class ColaboradorService {

  async findOne(matricula,token) {
    const response = await axios({
      url: `${url_base}/colaborador?matricula=${matricula}`,
      method: "GET",
      timeout: "5000",
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    });
    //console.log(response)
    return JSON.stringify(response.data);
  }
}
const colaboradorService = new ColaboradorService();
export default colaboradorService;
