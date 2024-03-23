interface Params {
  text: string,
  author: string,
  communityId: string | null,
  path: string,
 }  

export async function createThread({ }: Params);
