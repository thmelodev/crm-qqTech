import axios from "axios";
import { url_base } from "../routes";


class AppService {

  async login(data) {
    return axios({
      url: `${url_base}/login`,
      method: "POST",
      timeout: "5000",
      data: data,
      headers: {
        Accept: "application/json",
      },
    });
  }
}
const appService = new AppService();
export default appService;
