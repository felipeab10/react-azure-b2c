import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
interface ContentProps {
    children: ReactNode;
}
export function Content({ children }: ContentProps) {
    return (
        <Flex
            width="100vw"
            maxWidth={1100}
            justify="center"
            align="center"
            mx="auto"
            height="100vh"
            as="main">
            {children}
        </Flex>
    )
}