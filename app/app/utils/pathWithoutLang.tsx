const pathWithoutLang = (path: string) => {
  const splitPath = path.split("/");
  return "/" + splitPath.slice(2).join("/");
};

export default pathWithoutLang;
