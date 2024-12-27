import { IRoleCategoryDetails } from '../base/IRolesDetails';

export enum Roles {
  // Super User and Admin Roles
  SUPER_USER = 'SUPER_USER',
  ADMIN = 'ADMIN',
  BANNED = 'BANNED',
  SUSPENDED = 'SUSPENDED',
  AGENT = 'AGENT',
  BUYER = 'BUYER',

  // User Roles
  ACCESS_PROFILE = 'ACCESS_PROFILE',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  VIEW_DEVICES = 'VIEW_DEVICES',
  REMOVE_DEVICES = 'REMOVE_DEVICES',
  LOGIN = 'LOGIN',

  // Property Management
  CREATE_PROPERTY = 'CREATE_PROPERTY',
  READ_PROPERTY = 'READ_PROPERTY',
  UPDATE_PROPERTY = 'UPDATE_PROPERTY',
  DELETE_PROPERTY = 'DELETE_PROPERTY',
  FEATURE_PROPERTY = 'FEATURE_PROPERTY', // Highlight a property for premium listings

  // Inquiry Management
  CREATE_INQUIRY = 'CREATE_INQUIRY',
  READ_INQUIRY = 'READ_INQUIRY',
  RESPOND_TO_INQUIRY = 'RESPOND_TO_INQUIRY',
  DELETE_INQUIRY = 'DELETE_INQUIRY',

  // Subscription Management
  MANAGE_SUBSCRIPTION = 'MANAGE_SUBSCRIPTION', // Admin level
  VIEW_SUBSCRIPTION = 'VIEW_SUBSCRIPTION', // General access for users
  UPGRADE_SUBSCRIPTION = 'UPGRADE_SUBSCRIPTION',
  CANCEL_SUBSCRIPTION = 'CANCEL_SUBSCRIPTION',

  // Currency Management
  CREATE_CURRENCY = 'CREATE_CURRENCY',
  READ_CURRENCY = 'READ_CURRENCY',
  UPDATE_CURRENCY = 'UPDATE_CURRENCY',
  DELETE_CURRENCY = 'DELETE_CURRENCY',
  USE_CURRENCY = 'USE_CURRENCY',

  // Analytics
  VIEW_ANALYTICS = 'VIEW_ANALYTICS', // For Admins and Agents
  EXPORT_ANALYTICS = 'EXPORT_ANALYTICS', // For Admins

  // Agent Roles
  MANAGE_LISTINGS = 'MANAGE_LISTINGS', // Add, edit, delete properties
  VIEW_AGENT_PROFILE = 'VIEW_AGENT_PROFILE', // View agent-specific details

  // Buyer Roles
  VIEW_PROPERTIES = 'VIEW_PROPERTIES', // Browse properties
  SAVE_PROPERTIES = 'SAVE_PROPERTIES', // Save properties for later
  VIEW_SAVED_PROPERTIES = 'VIEW_SAVED_PROPERTIES',
  CONTACT_AGENT = 'CONTACT_AGENT', // Send inquiries

  // System Management
  MANAGE_USERS = 'MANAGE_USERS', // Admin role to manage users
  MANAGE_ROLES = 'MANAGE_ROLES', // Assign roles to users
  VIEW_AUDIT_LOGS = 'VIEW_AUDIT_LOGS', // Admins for security logs
}

export const DefaultRoles = {
  buyer: [
    Roles.ACCESS_PROFILE,
    Roles.VIEW_PROPERTIES,
    Roles.SAVE_PROPERTIES,
    Roles.VIEW_SAVED_PROPERTIES,
    Roles.CONTACT_AGENT,
    Roles.LOGIN,
    Roles.BUYER,
  ],
  agent: [
    Roles.ACCESS_PROFILE,
    Roles.MANAGE_LISTINGS,
    Roles.CREATE_PROPERTY,
    Roles.READ_PROPERTY,
    Roles.UPDATE_PROPERTY,
    Roles.DELETE_PROPERTY,
    Roles.RESPOND_TO_INQUIRY,
    Roles.VIEW_ANALYTICS,
    Roles.LOGIN,
    Roles.AGENT,
  ],
  admin: [
    Roles.SUPER_USER,
    Roles.ADMIN,
    Roles.MANAGE_USERS,
    Roles.MANAGE_ROLES,
    Roles.VIEW_AUDIT_LOGS,
    Roles.VIEW_ANALYTICS,
    Roles.EXPORT_ANALYTICS,
    Roles.MANAGE_SUBSCRIPTION,
    Roles.LOGIN,
    Roles.ADMIN,
  ],
  banned: [Roles.BANNED], // No other permissions
};

export const ROLES_DETAILS: IRoleCategoryDetails[] = [
  {
    name: 'User',
    description:
      'Account related access levels and can be used for managing your account',
    roles: [
      {
        name: 'Super User',
        description: 'Unrestricted access to all the features',
        role_id: Roles.SUPER_USER,
        active: false,
      },
      {
        name: 'Admin',
        description:
          'Administration to the application including enabling roles to users',
        role_id: Roles.ADMIN,
        active: false,
      },
      {
        name: 'Banned',
        description: 'Permanently restricted access to the application',
        role_id: Roles.BANNED,
        active: false,
      },
      {
        name: 'Suspended',
        description: 'Temporarily restricted access to the application',
        role_id: Roles.SUSPENDED,
        active: false,
      },
      {
        name: 'Access Profile',
        description: 'Access to your profile',
        role_id: Roles.ACCESS_PROFILE,
        active: false,
      },
      {
        name: 'View Devices',
        description: 'View devices linked to your account',
        role_id: Roles.VIEW_DEVICES,
        active: false,
      },
      {
        name: 'Remove Devices',
        description: 'Remove devices linked to your account',
        role_id: Roles.REMOVE_DEVICES,
        active: false,
      },
      {
        name: 'Login',
        description: 'Access to login to the application',
        role_id: Roles.LOGIN,
        active: false,
      },
    ],
  },
  {
    name: 'Property Management',
    description:
      'Roles for managing properties including creating, updating, and deleting listings',
    roles: [
      {
        name: 'Create Property',
        description: 'Add new property listings',
        role_id: Roles.CREATE_PROPERTY,
        active: false,
      },
      {
        name: 'Read Property',
        description: 'View property details',
        role_id: Roles.READ_PROPERTY,
        active: false,
      },
      {
        name: 'Update Property',
        description: 'Modify existing property listings',
        role_id: Roles.UPDATE_PROPERTY,
        active: false,
      },
      {
        name: 'Delete Property',
        description: 'Remove property listings',
        role_id: Roles.DELETE_PROPERTY,
        active: false,
      },
      {
        name: 'Feature Property',
        description: 'Mark property as featured for premium visibility',
        role_id: Roles.FEATURE_PROPERTY,
        active: false,
      },
    ],
  },
  {
    name: 'Inquiry Management',
    description:
      'Roles for managing inquiries from potential buyers or renters',
    roles: [
      {
        name: 'Create Inquiry',
        description: 'Submit an inquiry for a property',
        role_id: Roles.CREATE_INQUIRY,
        active: false,
      },
      {
        name: 'Read Inquiry',
        description: 'View inquiries made on properties',
        role_id: Roles.READ_INQUIRY,
        active: false,
      },
      {
        name: 'Respond to Inquiry',
        description: 'Respond to property inquiries',
        role_id: Roles.RESPOND_TO_INQUIRY,
        active: false,
      },
      {
        name: 'Delete Inquiry',
        description: 'Remove inquiries from the system',
        role_id: Roles.DELETE_INQUIRY,
        active: false,
      },
    ],
  },
  {
    name: 'Subscription Management',
    description: 'Roles for managing user subscriptions and payment plans',
    roles: [
      {
        name: 'Manage Subscription',
        description: 'Admin access to manage subscriptions',
        role_id: Roles.MANAGE_SUBSCRIPTION,
        active: false,
      },
      {
        name: 'View Subscription',
        description: 'Access subscription details',
        role_id: Roles.VIEW_SUBSCRIPTION,
        active: false,
      },
      {
        name: 'Upgrade Subscription',
        description: 'Upgrade subscription plans',
        role_id: Roles.UPGRADE_SUBSCRIPTION,
        active: false,
      },
      {
        name: 'Cancel Subscription',
        description: 'Cancel active subscriptions',
        role_id: Roles.CANCEL_SUBSCRIPTION,
        active: false,
      },
    ],
  },
  {
    name: 'Currency Management',
    description: 'Roles for managing currency settings within the system',
    roles: [
      {
        name: 'Create Currency',
        description: 'Add new currency options',
        role_id: Roles.CREATE_CURRENCY,
        active: false,
      },
      {
        name: 'Read Currency',
        description: 'View available currencies',
        role_id: Roles.READ_CURRENCY,
        active: false,
      },
      {
        name: 'Update Currency',
        description: 'Modify currency details',
        role_id: Roles.UPDATE_CURRENCY,
        active: false,
      },
      {
        name: 'Delete Currency',
        description: 'Remove currencies from the system',
        role_id: Roles.DELETE_CURRENCY,
        active: false,
      },
      {
        name: 'Use Currency',
        description: 'Access to utilize selected currencies in transactions',
        role_id: Roles.USE_CURRENCY,
        active: false,
      },
    ],
  },
  {
    name: 'Analytics and Audit',
    description: 'Roles for accessing analytics and security logs',
    roles: [
      {
        name: 'View Analytics',
        description: 'Access platform analytics data',
        role_id: Roles.VIEW_ANALYTICS,
        active: false,
      },
      {
        name: 'Export Analytics',
        description: 'Export analytics data for reporting',
        role_id: Roles.EXPORT_ANALYTICS,
        active: false,
      },
      {
        name: 'View Audit Logs',
        description: 'Access security and audit logs',
        role_id: Roles.VIEW_AUDIT_LOGS,
        active: false,
      },
    ],
  },
];
