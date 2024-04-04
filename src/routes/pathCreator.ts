export default class PathGenerator {
  private domain: string;
  public prepend: boolean;

  // EL PATH GENERATOR ME PETA SI DESCOMENTO ESTA LÍNEA
  constructor(domain?: string, prepend = false) {
    this.domain = domain || "";
    this.prepend = prepend;
  }

  protected prependDom(path: string): string {
    let out = this.domain;
    const formattedPath = path.startsWith("/") ? `${out}/${path.substring(1)}` : `${out}/${path}`;
    const basePath = this.prepend ? formattedPath : path;
    return basePath;
  }

  auth = {
    login: (): string => {
      return this.prependDom("/user/login");
    },
    register: (): string => {
      return this.prependDom("/user/register");
    },
  };
  user = {
    getUsers: (): string => {
      return this.prependDom("/user/getUsers");
    },
  };
}
