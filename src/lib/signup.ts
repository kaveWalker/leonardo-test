export const keyPrefix = 'leonardo-test:';
export const usernameKey = `${keyPrefix}username`;
export const jobTitleKey = `${keyPrefix}jobTitle`;

interface UserInput {
  username: string;
  jobTitle: string;
}

interface StoredUser {
  username?: string;
  jobTitle?: string;
}

export const getUser = (): StoredUser => ({
  username: localStorage.getItem(usernameKey) ?? undefined,
  jobTitle: localStorage.getItem(jobTitleKey) ?? undefined,
});

export const signup = ({username, jobTitle}: UserInput) => {
  localStorage.setItem(usernameKey, username);
  localStorage.setItem(jobTitleKey, jobTitle);
}