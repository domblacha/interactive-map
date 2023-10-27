export const VALIDATION_MESSAGES = {
  requiredField: 'To pole jest wymagane',
  invalidEmail: 'Nieprawidłowy adres e-mail',
  nonCompilantPass:
    'Hasło musi zawierać co najmniej 8 znaków w tym 1 literę, 1 cyfrę i znak specjalny',
  passwordsNotMatch: 'Hasła nie są zgodne',
};

export const VALIDATION_RULES = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/,
};
