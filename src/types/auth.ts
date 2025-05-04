// src/lib/types/auth.ts
import { UserRole } from '@/types/user';

export interface SignInCredentials {
    email: string;
    password: string;
}

export interface SignUpCredentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    tenantId?: string;
    tenantName?: string;
}

export interface UserResponseData {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    tenant?: {
        _id: string;
        name: string;
        dbName: string;
    };
}

export interface AuthResponse {
    message: string;
    user?: UserResponseData;
    data?: { user: UserResponseData; token: string };
}