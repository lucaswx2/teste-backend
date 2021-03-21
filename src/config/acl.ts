import acl from 'express-acl';

acl.config(
  {
    baseUrl: '/',
    filename: 'nacl.json',
    roleSearchPath: 'user.role',
  },
  {
    status: 'Access Denied',
    message: 'You are not authorized to access this resource',
  },
);

export default acl;
