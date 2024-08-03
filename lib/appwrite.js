import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.siddheshshinde.Aora',
  projectId: '66acbf6c001becee1d6e',
  databaseId: "66acc0dd0018dfdf0fec",
  userCollectionId: '66acc0fd0019c92fa818',
  videoCollectionId: '66acc12c0018a9608639',
  storageId: '66acc268003c0afb3dfd',

}

// Init your React Native SDK
const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )
    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)
    await signIn(email, password)

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email, email,
        username: username,
        avatar: avatarUrl
      }
    )

    return newUser
  } catch (error) {
    console.log("sign up fn", error)
    throw new Error(error)
  }
}



export async function signIn(email, password) {
  try {
    await deleteSession()
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    console.log("signIn fn", error)
    throw new Error(error)
  }
}

export async function deleteSession() {
  try {
    await account.deleteSessions()
  } catch (error) {
    console.log("Cannot delete the session", error)
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get()
    if(!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )
    if(!currentUser) throw Error

    return currentUser.documents[0]
  } catch (error) {
    console.log(error)

  }
}

export async function getAllPost() {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    )
    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
} 

export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    )
    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
} 

export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search('title', query)]
    )
    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
} 
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal('creator', userId)]
    )
    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
} 

export async function signOut() {
  try {
    const session = await account.deleteSessions('current');
    return session
  } catch (error) {
    throw new Error(error)
  }
}