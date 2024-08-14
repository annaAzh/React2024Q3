export const FILE_SIZE = 1024 * 1024 * 1;

export const FILE_EXTENSIONS = ['image/png', 'image/jpeg'];

export const enum REG_EXP {
  email = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
  special_character = '[\\!\\@\\#\\$\\%\\^\\&\\*]',
  uppercase = '[A-Z]',
  lowercase = '[a-z]',
  numbers = '[0-9]',
  start_lowercase = '^[A-Z]',
}
