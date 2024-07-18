import api from "./api.service";
import axios from "axios";
import { User } from "./types";

const isValidUser = (data: any): data is User => {
  return (
    typeof data._id === "string" &&
    typeof data.name === "string" &&
    typeof data.email === "string" &&
    typeof data.profilePicture === "string" &&
    typeof data.internalHours === "number" &&
    typeof data.externalHours === "number" &&
    Array.isArray(data.projectsActives) &&
    Array.isArray(data.finishedProjects) &&
    Array.isArray(data.projectFavorites) &&
    data.projectFavorites.every(
      (project: any) => typeof project === "string" || project === null
    ) &&
    typeof data.isAdmin === "boolean" &&
    typeof data.isTutor === "boolean" &&
    typeof data.__v === "number"
  );
};

const ensureUserArrayFields = (user: User): User => {
  user.projectsActives = Array.isArray(user.projectsActives)
    ? user.projectsActives
    : [];
  user.finishedProjects = Array.isArray(user.finishedProjects)
    ? user.finishedProjects
    : [];
  user.projectFavorites = Array.isArray(user.projectFavorites)
    ? user.projectFavorites
    : [];
  return user;
};

export const updateUser = async (
  email: string,
  formData: Partial<Omit<User, "_id" | "__v">>
): Promise<void> => {
  try {
    const response = await api.put(`user/${email}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("API Response:", response.data); // Log the full API response for debugging

    // Handle message response
    if (response.data.message === "User updated") {
      const userData = response.data.data;
      if (isValidUser(userData)) {
        ensureUserArrayFields(userData as User);
      } else {
        console.error("Invalid user data format:", userData);
        throw new Error("Invalid user data format");
      }
    } else {
      console.error("Invalid response format:", response.data);
      throw new Error("Invalid response format");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw new Error(
        `Error occurred while updating the user: ${error.message}`
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error(
        "Unexpected error occurred while updating the user. Please try again."
      );
    }
  }
};

export const getUserById = async (id: string): Promise<User | {}> => {
  try {
    const response = await api.get(`user/${id}`);
    if (response.status === 200 && isValidUser(response.data.data)) {
      return ensureUserArrayFields(response.data.data as User);
    } else {
      console.error("Invalid response format:", response.data);
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

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const response = await api.get(`user/${email}`);
    if (response.status === 200 && isValidUser(response.data.data)) {
      return ensureUserArrayFields(response.data.data as User);
    } else {
      console.error("Invalid response format:", response.data);
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};

export const createUser = async (
  formData: Omit<User, "_id" | "__v">
): Promise<User> => {
  try {
    const response = await api.post("user/", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (isValidUser(response.data)) {
      return ensureUserArrayFields(response.data as User);
    } else {
      console.error("Invalid response format:", response.data);
      throw new Error("Invalid response format");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw new Error(
        `Error occurred while creating the user: ${error.message}`
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error(
        "Unexpected error occurred while creating the user. Please try again."
      );
    }
  }
};
