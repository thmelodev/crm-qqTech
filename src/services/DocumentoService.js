import axios from "axios";
import { url_base } from "../routes";

class DocumentoService {
  async getDocument(pathDocumento,token) {
    const response = await axios({
      url: `${url_base}/documento/download?pathDocumento=${pathDocumento}`,
      method: "GET",
      timeout: "5000",
      headers: {
        Accept: "application/octet-stream",
        Authorization: `bearer ${token}`
      },
      responseType:'blob'
    });
    return response.data;
  }
}
const documentoService = new DocumentoService();
export default documentoService;
