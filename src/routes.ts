export const homePath = () => "/";

export const ticketsPath = () => "/tickets";
export const ticketPath = (ticketId: string) => `/tickets/${ticketId}`;
export const ticketEditPath = (ticketId: string) => `/tickets/${ticketId}/edit`;

export const signUpPath = () => "/sign-up";
export const signInPath = () => "/sign-in";
export const forgotPasswordPath = () => "/forgot-password";
export const passwordResetPath = () => "/password-reset";

export const accountProfilePath = () => "/account/profile";
export const accountPasswordPath = () => "/account/password";

export const organizationsPath = () => "/organization";
export const organizationCreatePath = () => "/organization/create";
export const organizationPath = (organizationSlug: string) =>
  `/organization/${organizationSlug}`;
export const organizationEditPath = (organizationSlug: string) =>
  `/organization/${organizationSlug}/edit`;

export const onboardingPath = () => "/onboarding";
