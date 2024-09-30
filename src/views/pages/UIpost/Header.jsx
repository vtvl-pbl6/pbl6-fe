import { Flex, Image, useColorMode } from "@chakra-ui/react"

const Header = () => {
    const {colorMode, toggleColorMode} = useColorMode()
  return (
    <Flex justifyContent={"center"} mt={6} mb="12"> 
        <Image
            cursor={"pointer"}
            alt="logo"
            W={6}
            src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
            onClick={toggleColorMode}
            width={10}
        />
    </Flex>
  )
}

export default Header