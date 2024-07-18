export interface Career {
  id: string;
  name: string;
  colorTag?: string;
}

export interface InscriptionTutor {
  _id: string;
  emailUser: string;
  userName: string;
  subject: string;
  faculty: string;
  careerYear: number;
  cum: number;
  subjectNote: string;
  status: string;
  __v: 0;
}

export interface Inscription {
  _id: string;
  emailUser: string;
  idProject: string;
  inscriptionHour: string;
  userName: string;
  projectName: string;
  status: string;
  __v: number;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  place: string;
  socialService: string;
  image: string;
  modality: string;
  schedule: string;
  moreInformation: string;
  careers: string[];
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
  internalHours: number;
  externalHours: number;
  projectsActives: (string | null)[];
  finishedProjects: (string | null)[];
  projectFavorites: (string | null)[];
  isAdmin: boolean;
  isTutor: boolean;
  __v: number;
}

//Types of UI

export interface LinksHeader {
  text: string;
  href: string;
}
