"use client";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
  Link,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import NextLink from "next/link";

interface LinkProps {
  url: string;
  title: string;
}

interface Props {
  item: LinkProps;
}

const Links = [
  {
    url: "/",
    title: "首页",
  },
  {
    url: "/blog",
    title: "博客",
  },
  {
    url: "/about",
    title: "关于",
  },
];

const NavLink = (props: Props) => {
  const { item } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "underline",
        bg: useColorModeValue("gray.200", "gray.900"),
      }}
      href={item.url}
    >
      <Text as="b" fontSize="lg">
        {item.title}
      </Text>
    </Box>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "darkColor")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
            <Link as={NextLink} href='/'>
              <Text as="b" fontSize="2xl">
                {process.env.NEXT_PUBLIC_SITE_NAME}
              </Text>
            </Link>
             
            </Box>
          </HStack>
          <Flex alignItems={"center"}>
            <HStack
              mr={4}
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.title} item={link}></NavLink>
              ))}
            </HStack>
            {/* <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu> */}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.url} item={link}></NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
