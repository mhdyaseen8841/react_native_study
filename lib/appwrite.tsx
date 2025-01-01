import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
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

const storage = new Storage(client);
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
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (err) {
    console.error("Error in getUser:", err);
    throw new Error((err as Error)?.message || "An unexpected error occurred");
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (err) {
    console.error("Error in getPosts:", err);
    throw new Error((err as Error)?.message || "An unexpected error occurred");
  }
};

export const getTrendingPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (err) {
    console.error("Error in getPosts:", err);
    throw new Error((err as Error)?.message || "An unexpected error occurred");
  }
};

// Get video posts that matches search query
export async function searchPosts(query: any) {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (err) {
    console.error("Error in getPosts:", err);
    throw new Error((err as Error)?.message || "An unexpected error occurred");
  }
}


// Get video posts created by user
export async function getUserPosts(userId:any) {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (err) {
    console.error("Error in getPosts:", err);
    throw new Error((err as Error)?.message || "An unexpected error occurred");
  }
}


// Upload File
export async function uploadFile(file:any, type:any) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (err) {
    console.error("Error in getPosts:", err);
    throw new Error((err as Error)?.message || "An unexpected error occurred");
  }
}

// Get File Preview
export async function getFilePreview(fileId:any, type:any) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        undefined,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (err) {
    console.error("Error in getPosts:", err);
    throw new Error((err as Error)?.message || "An unexpected error occurred");
  }
}

// Create Video Post
export async function createVideoPost(form:any) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (err) {
    console.error("Error in getPosts:", err);
    throw new Error((err as Error)?.message || "An unexpected error occurred");
  }
}
