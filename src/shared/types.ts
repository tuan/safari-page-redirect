export type Redirection = {
  pattern: string;
  replacement: string;
  autoRedirectEnabled: boolean;
  name: string;
  id: number;
};
export type RedirectSettings = {
  redirections: Redirection[];
};

export type SecondLastTabRequestMessage = {
  request: 'second_last_tab';
};
