import { Avatar, Box, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../components/Actions";
import Comment from "../components/Comment";

const PostPage = () => {
  const [liked,setliked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/mark.png" size={"md"} name="Mark Zuckerberg" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              Mark Zuckerberg
            </Text>
            <Image src="/tichxanh.png" w={4} h={4} ml={4}/>
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}> 
          <Text fontSize={"sm"} color={"gray.light"}> 1d </Text>
          <BsThreeDots/>
        </Flex>
      </Flex>

      <Text my={3}> Let's talk about Iphone 16 </Text>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src={"/post1.png"} width={"full"}/>
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked={liked} setliked={setliked} />
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}> 481 replies </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}> {1200 + (liked? 1 : 0)} likes </Text>
      </Flex>
      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontWeight={"bold"}> Threads trả lời </Text>
        </Flex>
      </Flex>
      <Divider my={4} />
      <Comment
        comment="Anh đẹp trai quá"
        createdAt ="2d"
        likes={100}
        username="vithuc"
        userAvatar= "https://bit.ly/sage-adebayo"
      />
      <Comment
        comment="Anh giàu quá"
        createdAt ="2d"
        likes={100}
        username="luynvo"
        userAvatar= "https://bit.ly/code-beast"
      />
      <Comment
        comment="Iphone 16 xấu quá"
        createdAt ="2d"
        likes={100}
        username="truongmau"
        userAvatar= "https://bit.ly/dan-abramov"
      />
    </>
  )
}

export default PostPage