import React from "react";
import Signup from "../components/Auth/Signup";
import Login from "../components/Auth/Login";
import { Box, Container, Text, Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react'
const Home = () => {
    return (
        <Container maxW="xl" centerContent>
            <Box d="flex" justifyContent="center" p={3} bg={"white"} w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px">
                <Text fontSize='2xl' textAlign="center" fontFamily="Work sans">Talk-A-Tive</Text>
            </Box>

            <Box d="flex" justifyContent="center" p={3} bg={"white"} w="100%" m="15px 0 15px 0" borderRadius="lg" borderWidth="1px">
                <Tabs variant='soft-rounded'>
                    <TabList mb="1em">
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign-up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login/>
                        </TabPanel>
                        <TabPanel>
                            <Signup/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Home;