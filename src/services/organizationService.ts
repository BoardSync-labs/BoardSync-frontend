import axios from 'axios';
import { authService } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance with interceptor for auth token
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface CreateOrganizationData {
  name: string;
  invitations: {
    email: string;
    role: 'admin' | 'employee';
  }[];
}

export interface OrganizationResponse {
  success: boolean;
  message: string;
  data: {
    organization_id: string;
    name: string;
    invitations: {
      email: string;
      status: string;
      message: string;
    }[];
  };
}

export interface Organization {
  organization_id: string;
  organization_name: string;
  admin: {
    id: string;
    name: string;
    email: string;
  };
  members: {
    id: string;
    name: string;
    email: string;
    role: string;
  }[];
}

export const organizationService = {
  async createOrganization(data: CreateOrganizationData): Promise<OrganizationResponse> {
    const response = await api.post('/organizations/', data);
    return response.data;
  },

  async getOrganizations(): Promise<{ success: boolean; data: Organization[]; message: string }> {
    const response = await api.get('/organizations/');
    return response.data;
  },

  async getOrganizationById(orgId: string): Promise<{ success: boolean; data: Organization; message: string }> {
    const response = await api.get(`/organizations/${orgId}`);
    return response.data;
  },

  async updateOrganization(orgId: string, data: { name: string }): Promise<OrganizationResponse> {
    const response = await api.patch(`/organizations/${orgId}`, data);
    return response.data;
  },

  async deleteOrganization(orgId: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete(`/organizations/${orgId}`);
    return response.data;
  },
};