// services/inscriptionService.ts
import api from "./api.service";
import axios from "axios";
import { Inscription } from "./types";

export const getInscriptions = async (): Promise<Inscription[]> => {
  try {
    const response = await api.get("inscription");
    if (response.status === 200) {
      return response.data.data as Inscription[];
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

export const createInscription = async (
  formData: Omit<Inscription, "_id" | "__v">
): Promise<Inscription> => {
  try {
    const response = await api.post("inscription", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data as Inscription;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error(
      "Error occurred while creating the inscription. Please try again."
    );
  }
};

export const updateInscription = async (
  id: string,
  formData: Partial<Omit<Inscription, "_id" | "__v">>
): Promise<Inscription> => {
  try {
    const response = await api.put(`inscription/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data as Inscription;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error(
      "Error occurred while updating the inscription. Please try again."
    );
  }
};

export const getInscriptionById = async (
  id: string
): Promise<Inscription | {}> => {
  try {
    const response = await api.get(`inscription/${id}`);
    if (response.status === 200) {
      return response.data.data as Inscription;
    } else {
      return {};
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return {};
  }
};
