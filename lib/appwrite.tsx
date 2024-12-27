import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.selfhexameta.aora",
  projectId: "676d58e0002501a0d69d",
  databaseId: "676d5a14002972bb34e9",
  userCollectionId: "676d5a39000b7c11de3c",
  videoCollectionId: "676d5a580039705fd668",
  storageId: "676d5b77001b8f19eb47",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  userName: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      userName
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(userName);

    await signInUser(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username: userName,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (err) {
    console.log("errorrrrr");
    console.log(err);
  }
};

export async function signInUser(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (err) {
    console.error("Error in signin user:", err);
    throw new Error((err as Error)?.message || "An unexpected error occurred");
  }
}

export async function signOutUser() {
  try {
    await account.deleteSession("current");
  } catch (err) {
    console.error("Error in signout user:", err);
    throw new Error((err as Error)?.message || "An unexpected error occurred");
  }
}

export async function getCurrentUser() {
try{
  const currentAccount = await account.get();
  
  if(!currentAccount) throw Error;
 
  const currentUser = await databases.listDocuments(
    config.databaseId,
    config.userCollectionId,
    [Query.equal('accountId', currentAccount.$id)]
  )

  if(!currentUser) throw Error;

  return currentUser.documents[0];

}catch(err){
  console.error("Error in getUser:", err);
  throw new Error((err as Error)?.message || "An unexpected error occurred");
}


}