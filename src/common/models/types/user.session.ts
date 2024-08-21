export interface SessionUser {
  email: string;
  firstName: string;
  lastName: string;
  userId: string;
  username: string;
}

export interface SessionInformation {
  applicationId?: string;
  lastActive?: string;
  online?: boolean;
  sessionId?: string;
  user?: SessionUser;
}
