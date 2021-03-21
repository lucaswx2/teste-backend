declare namespace Express {
  export interface Request {
    user?: {
      id?: string;
      email?: string;
      type_id?: number;
      status?: boolean;
    };
  }
}
