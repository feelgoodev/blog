import { initializeApp } from "firebase/app";
import { getDatabase,ref,set,get,child, update, push, remove } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from "firebase/auth";
import { CategoryType } from "../pages/CreatePost";
import { PostMetaDataType } from "../pages/PostLists";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export function LogIn (){
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user= result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}

const db = getDatabase(app);

export async function writeData(query:string, content:object|string) {
  return set(ref(db, query), content)
  .then(res=>res)
  .catch(error=>error);
}

export async function updateData(query:string, content:object|string) {
  return update(ref(db), {
    [query]:content
  });
}

export async function updateMetaDataSizeFirebase(query:string, content:Array<PostMetaDataType>, currentPostIndex:number) {
  const tempObj:{[index:string] : PostMetaDataType} = {};
  let indexCount = 0;

  for (let i = 0; i < content.length; i ++){
    if(i !== currentPostIndex){
      tempObj[indexCount] = content[i];
      indexCount++;
    }
  }


  return update(ref(db), {
    [query]:tempObj
  });
}

export async function deleteData(query:string) {
  return remove(ref(db, query))
}

export async function addData(query:string, content:object) {
  const postListRef = ref(db, query);
  const newPostRef = push(postListRef);
  return set(newPostRef, content)
  .then(res=>res)
  .catch(error=>error);
}

export function ObserveAuthChange(callback:(user:void|User|null)=>void){
  onAuthStateChanged(auth, async(user) => {
    const updatedUser = user ? await checkAdminUser(user) : null;
    callback(updatedUser);
  });
}

async function checkAdminUser(user:User){
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `admins`)).then((snapshot) => {
    if (snapshot.exists()) {
      const val = snapshot.val();
      const admin = val.includes(user.uid);
      return {...user, admin}
    } else {
      return user;
    }
  }).catch((error) => {
    console.error(error);
  });
}

export function getRequest(query:string){
  const dbRef = ref(getDatabase());
  return get(child(dbRef, query)).then((snapshot) => {
    if (snapshot.exists()) {
      const val = snapshot.val();
      return val;
    } else {
      return null;
    }
  }).catch((error) => {
    console.error(error);
  });
}

export async function getCategories() : Promise<Array<CategoryType>>{
  return getRequest('categories');
}

export async function getDetail(id:string|undefined) : Promise<string|undefined>{
  if(id){
    return getRequest(`/details/${id}`);
  }
  throw new Error("No ID");
}

export async function getMetaData(){
  return getRequest('metaData');
}

export async function addMetaData(category:string|null, categoryObject:CategoryType, id:number, title:string){

  return writeData(
    `/metaData/${category}/${categoryObject ? categoryObject.quantity : 0}`, {id, title, category}
  )
}



export function LogOut(){
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}
