import { auth, db } from "./firebase";
import { setDoc, doc,getDoc,getDocs,collection  } from "firebase/firestore";
export async function getAllHomes(lang) {
    if(lang=='en'){
        try {
            const usersCollection = collection(db, 'homes');
            const usersSnapshot = await getDocs(usersCollection); 
            const usersArray = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
            console.log(usersArray);
            
            return usersArray;
          } catch (error) {
            console.error("Error getting users:", error);
          }
    }
    else{
        try {
            const usersCollection = collection(db, 'homesAr');
            const usersSnapshot = await getDocs(usersCollection); 
            const usersArray = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
            return usersArray;
          } catch (error) {
            console.error("Error getting users:", error);
          }
    }    
}
export async function getDocumentById(collectionName, documentId) {
    try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data();
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        throw error;
    }
}