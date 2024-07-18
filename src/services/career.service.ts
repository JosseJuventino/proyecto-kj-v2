import api from "./api.service";
import { Career } from "./types";

const transformCareerName = (name: string): string => {
  return name
    .replace("Ingeniería", "Ing.")
    .replace("Licenciatura", "Lic.")
    .replace("Profesorado", "Prof.")
    .replace("Técnico", "Tec.");
};

export const getAllCareers = async (): Promise<Career[]> => {
  try {
    const response = await api.get("career/");
    if (response.status === 200) {
      const careersData: Career[] = response.data.data;
      const transformedCareers = careersData.map((career) => ({
        ...career,
        name: transformCareerName(career.name),
        colorTag: career.colorTag || "#000000",
      }));
      return transformedCareers;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};
