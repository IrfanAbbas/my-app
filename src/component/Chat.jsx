// // Chat.jsx
// import React, { useState } from 'react';
// import { Box, Container, VStack, Button, Input, HStack } from '@chakra-ui/react';
// import { getAuth, signOut } from 'firebase/auth';
// import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import Message from './Message';
// import { app } from './Firebase';

// export default function Chat() {
//   const [message, setMessage] = useState(''); // State to hold the message input
//   const navigate = useNavigate();
//   const [messages, setMessages]= useState([]);
//   const auth = getAuth(app);
//   const db = getFirestore(app); // Ensure Firestore is correctly initialized
//   const user = auth.currentUser; // Get the current user

//   // Function to handle logout
//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         navigate('/'); // Sign-out successful, redirect to home
//       })
//       .catch((error) => {
//         console.error('Logout failed:', error);
//       });
//   };

//   // Function to handle sending a message
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) return; // Prevent sending empty messages

//     try {
//       // Ensure user and db are properly initialized before sending message
//       if (!user || !db) {
//         throw new Error('User not authenticated or database not initialized.');
//       }

//       await addDoc(collection(db, 'Message'), {
//         text: message,
//         uid: user.uid, // Ensure user is authenticated
//         uri: user.photoURL,
//         createdAt: serverTimestamp(),
//       });
//       setMessage(''); // Clear the input after sending
//     } catch (error) {
//       alert(`Failed to send message: ${error.message}`);
//     }
//   };

//   return (
//     <Box
//       h="100vh"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       bg="red.50"
//     >
//       <Container
//         w={{ base: '90%', md: '50%', lg: '30%' }}
//         h="100vh"
//         bg="white"
//         boxShadow="lg"
//         borderRadius="md"
//         p={4}
//       >
//         <VStack h="full" spacing={4}>
//           <Button
//             backgroundColor="red"
//             color="white"
//             w="full"
//             h="40px"
//             fontSize="25px"
//             borderRadius="20px"
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//           <VStack h="full" w="full" spacing={4} overflowY="auto">
//             {
              
//               messages.map(item =>(

//                 <Message user={item.uri=== user.uid ?"me": "other"}
//                 text={item.text}
//                 uri={item.uri}
//                 key={item.id}
//                 />
//               ))
//               }
//             <Message user="me" text="Sample Message" />
//           </VStack>

//           <form onSubmit={handleSendMessage} style={{ width: '100%' }}>
//             <HStack>
//               <Input
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 w="full"
//                 placeholder="Enter Message..."
//                 variant="outline"
//                 bg="gray.50"
//                 outline="none"
//                 h="30px"
//                 borderRadius="7px"
//               />
//               <Button
//                 type="submit"
//                 backgroundColor="purple"
//                 color="white"
//                 w="60px"
//                 h="30px"
//                 borderRadius="7px"
//                 aria-label="Send Message"
//               >
//                 Send
//               </Button>
//             </HStack>
//           </form>
//         </VStack>
//       </Container>
//     </Box>
//   );
// }











// Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, VStack, Button, Input, HStack } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Message from './Message';
import { app } from './Firebase';

export default function Chat() {
  const [message, setMessage] = useState(''); // State to hold the message input
  const [messages, setMessages] = useState([]); // State to hold messages
  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser; // Get the current user
  const divForScroll = useRef(null);

  // Function to handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/'); // Sign-out successful, redirect to home
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  // Function to handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent sending empty messages

    try {
      if (!user || !db) {
        throw new Error('User not authenticated or database not initialized.');
      }

      await addDoc(collection(db, 'Message'), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });

      setMessage(''); // Clear the input after sending
      divForScroll.current.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
      alert(`Failed to send message: ${error.message}`);
    }
  };

  // useEffect to set up a real-time listener for messages
  useEffect(() => {
    if (!db) return;

    // Create a query to get messages ordered by timestamp
    const q = query(collection(db, 'Message'), orderBy('createdAt', 'asc'));

    // Set up the onSnapshot listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [db]);

  return (
    <Box h="100vh" display="flex" alignItems="center" justifyContent="center" bg="red.50">
      <Container
        w={{ base: '90%', md: '50%', lg: '30%' }}
        h="100vh"
        bg="white"
        boxShadow="lg"
        borderRadius="md"
        p={4}
      >
        <VStack h="full" spacing={4}>
          <Button
            backgroundColor="red"
            color="white"
            w="full"
            h="40px"
            fontSize="25px"
            borderRadius="20px"
            onClick={handleLogout}
          >
            Logout
          </Button>
          <VStack
  h="full"
  w="full"
  spacing={4}
  overflowY="auto"
  sx={{
    // Hide scrollbar for Webkit browsers (Chrome, Safari)
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }}
>
            {messages.map((item) => (
              <Message
                user={item.uid === user.uid ? 'me' : 'other'}
                text={item.text}
                uri={item.uri}
                key={item.id}
              />
            ))}
            <div ref={divForScroll}></div>
          </VStack>

          <form onSubmit={handleSendMessage} style={{ width: '100%' }}>
            <HStack>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                w="full"
                placeholder="Enter Message..."
                variant="outline"
                bg="gray.50"
                outline="none"
                h="30px"
                borderRadius="7px"
              />
              <Button
                type="submit"
                backgroundColor="purple"
                color="white"
                w="60px"
                h="30px"
                borderRadius="7px"
                aria-label="Send Message"
              >
                Send
              </Button>
            </HStack>
          </form>
        </VStack>
      </Container>
    </Box>
  );
}

 