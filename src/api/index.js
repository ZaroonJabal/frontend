import axiosInstance from "../helpers/axios";

export const getFinancialData = async (companyId) => {
  try {
    const response = await axiosInstance.get("/", {
      params: { companyId: companyId },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const postdata = async (data) => {
  try {
    const response = await axiosInstance.post("", { data });
    return response.data;
  } catch (error) {
    throw error?.response?.data?.errors[0]?.detail;
  }
};

export const getShareholderData = async (companyId) => {
  try {
    const response = await axiosInstance.get("/shareholders", {
      params: { companyId: companyId },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCompanies = async (name) => {
  try {
    const response = await axiosInstance.get("/companies", {
      params: { name: name },
    });
    return response;
  } catch (error) {
    throw error;
  }
};