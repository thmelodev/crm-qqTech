import axios from "axios";

class AppService {

  async login(data) {
    try {
      const response = await axios({
        url: "http://localhost:5000/login",
        method: "POST",
        timeout: "5000",
        data: data,
        headers: {
          Accept: "application/json",
        },
      });
      console.log(response)
      return response;
    } catch (error) {
      alert("Usuario ou senha invalida")
    }
  }
}
const appService = new AppService();
export default appService;
