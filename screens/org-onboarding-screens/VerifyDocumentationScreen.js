import React from "react";
import { Button, Text, View } from "react-native";

const VerifyDocumentationScreen = (props) => {
    return (
        <View>
            <Text>Verify your organization </Text>
            <Text>To prevent fraud, we need to properly vet organization credentials.</Text>
            <Text>Proof of organization</Text>
            <Text>Please provide a clear photo of your 501c3 or other state-approved documentation.</Text>
            <Button 
                title="photo of documentation" 

            />
            <Button
                title="next"
                onPress={() => {
                    props.navigation.navigate("VerifyOrganization")
                }}            
            >Next</Button>
        </View>
    );
}

export default VerifyDocumentationScreen;