export default (condition: boolean, hook: any) => {
  if (!condition) {
    return {};
  }
  return hook();
}
