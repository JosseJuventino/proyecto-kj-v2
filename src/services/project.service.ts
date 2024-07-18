// services/projectService.ts
import api from "./api.service";
import axios from "axios";
import { Project } from "./types";

export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const response = await api.get("project/");
    if (response.status === 200) {
      return response.data.data as Project[];
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

export const createProject = async (
  formData: Omit<Project, "_id" | "__v">
): Promise<Project> => {
  try {
    const response = await api.post("project/", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data as Project;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error(
      "Error occurred while creating the project. Please try again."
    );
  }
};

export const updateProject = async (
  id: string,
  formData: Partial<Omit<Project, "_id" | "__v">>
): Promise<Project> => {
  try {
    const response = await api.put(`project/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data as Project;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error(
      "Error occurred while updating the project. Please try again."
    );
  }
};

export const getProjectById = async (id: string): Promise<Project> => {
  try {
    const response = await api.get(`project/${id}`);
    console.log(id);
    if (response.status === 200 && response.data.data) {
      return response.data.data as Project;
    } else {
      throw new Error("Project not found");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Error fetching project");
  }
};

export const getProjectByName = async (name: string): Promise<Project> => {
  try {
    const response = await api.get(`project/titulo/${name}`);
    if (response.status === 200 && response.data.data) {
      return response.data.data as Project;
    } else {
      throw new Error("Project not found");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Error fetching project");
  }
};
