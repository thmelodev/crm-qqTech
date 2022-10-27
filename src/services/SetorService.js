import axios from "axios";
import { url_base } from "../routes";


class SetorService {

  async listSectors(token) {
    const response = await axios({
      url: `${url_base}/setor/all`,
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
const setorService = new SetorService();
export default setorService;
