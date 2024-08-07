export default class PathGenerator {
  private domain: string;
  public prepend: boolean;

  constructor(domain?: string, prepend = false) {
    this.domain = domain || "";
    this.prepend = prepend;
  }

  protected prependDom(path: string): string {
    let out = this.domain;
    const formattedPath = path.startsWith("/api/")
      ? `${out}/${path.substring(1)}`
      : `${out}/${path}`;
    const basePath = this.prepend ? formattedPath : path;
    return basePath;
  }

  auth = {
    login: (): string => {
      return this.prependDom("/user/login");
    },
  };

  corporative = {
    login: (): string => {
      return this.prependDom("/corp/login");
    },
  };

  user = {
    getUsers: (): string => {
      return this.prependDom("/user/getUsers");
    },
    register: (): string => {
      return this.prependDom("/user/register");
    },
    getMe: (): string => {
      return this.prependDom("/user/getme");
    },
  };

  company = {
    register: (): string => {
      return this.prependDom("/company/register");
    },
  };

  recruiter = {
    register: (): string => {
      return this.prependDom("/recruiter/register");
    },
  };
  // JOB
  job = {
    create: (): string => {
      return this.prependDom("/job/create");
    },
    getJobList: (): string => {
      return this.prependDom("/jobs");
    },
    getJob: (): string => {
      return this.prependDom("/job/:jobId");
    },
  };

  jobApplication = {
    apply: (): string => {
      return this.prependDom("/job/apply");
    },
  };

  // ADMIN
  admin = {
    getInactiveUsers: (): string => {
      return this.prependDom("/admin/inactiveUsers");
    },
  };
}
