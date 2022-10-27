import axios from "axios";

const port= 5000
const url_base = `http://localhost:${port}`

class CrmService {

  async createCrm(data,token) {
    const response = await axios({
      url: `${url_base}/crm/create`,
      method: "POST",
      timeout: "5000",
      data:data,
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    });
    return JSON.stringify(response[0].data);
  }

  async listRejectedCrm(matricula,token) {
    const response = await axios({
      url: `${url_base}/crm/rejectedCrm?matricula=${matricula}`,
      method: "GET",
      timeout: "5000",
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    });
    return JSON.stringify(response.data);
  }

  async listPendingCrm(matricula,token) {
    const response = await axios({
      url: `${url_base}/crm/pendingCrm?matricula=${matricula}`,
      method: "GET",
      timeout: "5000",
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    });
    return JSON.stringify(response.data);
  }

  async listApprovedCrm(matricula,token) {
    const response = await axios({
      url: `${url_base}/crm/approvedCrm?matricula=${matricula}`,
      method: "GET",
      timeout: "5000",
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    });
    return JSON.stringify(response.data);
  }

  async getCrm(id,versao,token){
    const response = await axios({
      url: `${url_base}/crm?id=${id}&versao=${versao}`,
      method: "GET",
      timeout: "5000",
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${token}`
      },
    })
    return JSON.stringify(response.data);
  }

}


const crmService = new CrmService();
export default crmService;
