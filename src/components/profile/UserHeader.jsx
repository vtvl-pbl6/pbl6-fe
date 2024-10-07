import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Portal } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";

const UserHeader = () => {
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
  };
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} width={"full"}>
        <Box>
          <Text fontSize={"2x1"} fontWeight={"bold"}>
            {" "}
            Mark Zuckerberg{" "}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"small"}>markzuckerberg</Text>
            <Text
              fontSize={"small"}
              bg={"gray.dark"}
              color={"gray.light"}
              padding={1}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            name="Mark Zuckerberg"
            src="/mark.png"
            size={{
              base: "md",
              md: "lg",
            }}
          />
        </Box>
      </Flex>

      <Text> Co-founder of Meta </Text>
      <Flex width={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}> 3.2k followers </Text>
          <Box
            width={1}
            height={1}
            bg={"gray.light"}
            borderRadius={"full"}
          ></Box>
          <Link color="gray.light"> instagram.com </Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    {" "}
                    Copy Link{" "}
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}> Threads </Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid white"}
          justifyContent={"center"}
          color={"gray.light"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}> Reposts </Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
