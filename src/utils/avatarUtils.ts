
export const getInitials = (firstName: string, lastName: string): string => {
  const first = firstName?.charAt(0).toUpperCase() || '';
  const last = lastName?.charAt(0).toUpperCase() || '';
  return `${first}${last}`;
};

export const getInitialsFromEmail = (email: string): string => {
  const parts = email.split('@')[0].split('.');
  if (parts.length >= 2) {
    return `${parts[0].charAt(0).toUpperCase()}${parts[1].charAt(0).toUpperCase()}`;
  }
  return email.charAt(0).toUpperCase() + (email.charAt(1) || '').toUpperCase();
};
