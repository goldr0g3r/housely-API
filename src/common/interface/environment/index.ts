export interface IEnvironment {
  port: number;
  nodeEnv: string;

  mongoUri: string;

  // Database
  userDb: string;
  categoryDb: string;
  propertyDb: string;

  // Auth
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;

  // cookie
  cookieSecret: string;
  cookieExpiresIn: string;
  
}
