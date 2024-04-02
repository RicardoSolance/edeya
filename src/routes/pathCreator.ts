type UrlBuilder = (params?: string[]) => string;

const createPathGenerator = (domain: string = "", prepend: boolean = false): { [key: string]: UrlBuilder } => {
  const buildUrl = (path: string, params: string[] = []): string => {
    let url = prepend ? domain + path : path;
    params.forEach((param) => {
      url += `/${param}`;
    });
    return url;
  };

  return {
    image: {
      add: (): string => buildUrl("/image"),
    },
    auth: {
      login: (): string => buildUrl("/user/login"),
      renew: (): string => buildUrl("/user/renewal"),
      register: (): string => buildUrl("/user/register"),
      forgot: (): string => buildUrl("/user/forgot"),
      setPass: (): string => buildUrl("/user/setPass"),
    },
    user: {
      edit: (): string => buildUrl("/user/edit"),
      find: (): string => buildUrl("/user/find"),
      get: (): string => buildUrl("/user/getUsers"),
      active: (email: string): string => buildUrl("/user/activate", [email]),
    },
    votePoll: {
      add: (): string => buildUrl("/createVote/registerElections"),
      get: (): string => buildUrl("/Createvote/getVotePoll"),
      getOne: (id: string): string => buildUrl("/Createvote/getVotePoll", [id]),
      edit: (): string => buildUrl("/Createvote/editElections"),
      delete: (id: string): string => buildUrl("/Createvote", [id]),
    },
    email: {
      send: (): string => buildUrl("/send-email"),
    },
    diploma: {
      get: (): string => buildUrl("/diploma"),
      create: (): string => buildUrl("/diploma"),
    },
    poll: {
      get: (): string => buildUrl("/poll/get"),
      vote: (): string => buildUrl("/poll/vote"),
      userVotes: (): string => buildUrl("/poll/userVotes"),
      allVotes: (): string => buildUrl("/poll/all-votes"),
      older: (): string => buildUrl("/poll/older"),
      getPollResults: (id: string): string => buildUrl("/poll/results", [id]),
    },
    quotes: {
      get: (): string => buildUrl("/quote"),
      post: (): string => buildUrl("/quote"),
      edit: (): string => buildUrl("/quote"),
      delete: (id: string): string => buildUrl("/quote", [id]),
    },
  };
};

export default createPathGenerator;
