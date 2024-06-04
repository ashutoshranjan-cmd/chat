
import { Box, Button, Container, Input, VStack, HStack } from "@chakra-ui/react"
import Message from "./components/Message"
import{getAuth,GoogleAuthProvider, onAuthStateChanged, signInWithPopup,signOut} from "firebase/auth"
import { app } from "./firebase"
import {getFirestore,addDoc,collection,serverTimestamp,onSnapshot,query,orderBy} from 'firebase/firestore'
import { useEffect, useState,useRef } from "react"


const auth = getAuth(app)
const db = getFirestore(app)
function App() {
  const q = query(collection(db,"Messages"),orderBy("createdAt","asc"))
  const [user,setUser] = useState<any>(false);
  const[message,setMessage] = useState<any>("")
  const[messages,setMessages] = useState<any>([]);
  const divForScroll = useRef(null)
  console.log(user);
  const loginHandler = ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider)
  }
 
 useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth,(data:any):void =>{
    // console.log(data)
    setUser(data);
  })
  const unsubscribeForMessage = onSnapshot(q,(snap)=>{
    setMessages(
      snap.docs.map((item)=>{
        const id = item.id;
        return{id,...item.data()};
      })
    )
  })
  return ()=>{
    unsubscribe();
    unsubscribeForMessage();
  }
 },[])
 const logoutHandler = ()=>{
   signOut(auth)
 }
 const submitHandler = async(e:any)=>{
   e.preventDefault();
   
   try{
     await addDoc(collection(db,"Messages"),{
      text:message,
      uid: user.uid,
      uri:user.photoURL,
      createdAt:serverTimestamp()
     })
     setMessage("")
     divForScroll.current.scrollIntoView({behavior:"smooth"})
   }
   catch(error)
   {
    alert(error)
   }
 }
  return (
    <Box bg={"red.50"}>
      {
        user?(
          <Container h={"100vh"} bg={"white"}>
        <VStack h={"full"}  paddingY={"4"}>
          <Button  onClick={logoutHandler} colorScheme={"red"} w={"full"}>Logout</Button>
          <VStack h="full" w="full" overflowY={"auto"} css={{"&::-webkit-scrollbar":{display:"none"}}}>
            {
              messages.map(item  =>(
                <Message  key={item.id} text={item.text} uri={item.uri} user={item.uri === user.uid ?"me":"other"}/>
              ))
            }
   
          <div ref={divForScroll}></div>
          </VStack>
          <form onSubmit={submitHandler} style={{width:"100%"}}>
            <HStack>
              <Input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Enter a message ..."/>
              <Button colorScheme={"purple"} type="submit">Send</Button>
            </HStack>
          </form>
        </VStack>
      </Container>
        ):(
          <VStack bg={"white"} h={"100vh"} justifyContent={"center"}>
            <Button colorScheme="purple" onClick={loginHandler}>Sign in with google</Button>
          </VStack>
        )
      }
    </Box>
  )
}

export default App
