// <reference types="nativewind/types" />

declare module "*.ttf" {
  const content: string;
  export default content;
}

declare module "*.TTF" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: number;
  export default content;
}
