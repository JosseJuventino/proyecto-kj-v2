// services/inscriptionTutorService.ts
import api from "./api.service";
import axios from "axios";
import { InscriptionTutor } from "./types";

export const getInscriptionsTutor = async (): Promise<InscriptionTutor[]> => {
  try {
    const response = await api.get("inscriptionTutor/");
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return [];
  }
};
