import React from "react";
import { Box, useDisclose, IconButton, Stagger, HStack, Icon, Center, NativeBaseProvider } from "native-base";
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";

export const StaggerComponent = ({navigation}) => {
    const {
        isOpen,
        onToggle
    } = useDisclose();
    return <Center>
        <Box
            style={{
                position: 'absolute',
                bottom: 45,
                left: RFValue(5),
                zIndex: 10,
            }}>
            <Stagger visible={isOpen} initial={{
                opacity: 0,
                scale: 0,
                translateY: 34
            }} animate={{
                translateY: 0,
                scale: 1,
                opacity: 1,
                transition: {
                    type: "spring",
                    mass: 0.8,
                    stagger: {
                        offset: 30,
                        reverse: true
                    }
                }
            }} exit={{
                translateY: 34,
                scale: 0.5,
                opacity: 0,
                transition: {
                    duration: 100,
                    stagger: {
                        offset: 30,
                        reverse: true
                    }
                }
            }}>
                <IconButton mb="4" variant="solid" bg="indigo.500" colorScheme="indigo" borderRadius="full" icon={<Icon as={FontAwesome5} size="6" name="sign-out-alt" _dark={{
                    color: "warmGray.50"
                }} color="warmGray.50" />} />

                <TouchableOpacity
                onPress={()=>{navigation.navigate('LogIn')}}
                >
                <IconButton mb="4" variant="solid" bg="yellow.600" colorScheme="yellow" borderRadius="full" icon={<Icon as={FontAwesome5} _dark={{
                    color: "warmGray.50"
                }} size="6" name="sign-in-alt" color="warmGray.50" />}
                />
                </TouchableOpacity>
                
            </Stagger>
        </Box>
        <HStack alignItems="center">
            <IconButton variant="solid" borderRadius="full" size="lg" onPress={onToggle} bg="cyan.400" icon={<Icon as={MaterialCommunityIcons} size="6" name="dots-horizontal" color="warmGray.50" _dark={{
                color: "warmGray.50"
            }} />} />
        </HStack>
    </Center>;
};