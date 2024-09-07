import React from 'react';
import { HStack, Avatar, Text } from '@chakra-ui/react';

export default function Message({ text, uri, user = 'other' }) {
  return (
    <HStack
      p={4}
      bg="gray.100"
      borderRadius="10px"
      paddingX={user === 'me' ? "4" : "2"}
      paddingY={2}
      alignSelf={user === 'me' ? 'flex-end' : 'flex-start'}
      spacing={4}
      h="auto" // Allow height to adjust based on content
    >
      {user === 'other' && <Avatar src={uri} h="35px" w="35px" border="1px solid grey" />}
      
      {/* Center the text vertically and horizontally within the container */}
      <Text flex="1" textAlign="center" display="flex" alignItems="center" justifyContent="center">
        {text}
      </Text>

      {user === 'me' && <Avatar src={uri} h="35px" w="35px" border="1px solid grey" />}
    </HStack>
  );
}
