import * as React from "react";
import { StyleSheet, View, Text, TextInput, Pressable, Button } from "react-native";
import colors from "../../theme/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import DropdownComponent from "../components/DropDown";
import DatePicker from "../components/DatePicker";

interface IRegisterProps {}

enum GenderTypes {
  male = "male",
  female = "female",
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const [selectedGender, setSelectedGender] = React.useState<
    GenderTypes | undefined
  >();
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");

  const handleGenderSelection = (gender: GenderTypes | undefined) => {
    setSelectedGender(gender);
  };

  return (
    <View style={styles.container}>
      <View style={styles.registerContainer}>
        <Text style={styles.headerText}>Register</Text>
        <View style={styles.inputContainerWrapper}>
          <View style={styles.inputRowContainer}>
            <Text style={styles.inputFieldNameText}>Candidate Name</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.inputText} />
            </View>
          </View>
          <View style={styles.inputRowContainer}>
            <Text style={styles.inputFieldNameText}>Gender</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Pressable
                style={styles.genderOption}
                onPress={() => handleGenderSelection(GenderTypes.male)}
              >
                <Icon
                  name={
                    selectedGender === GenderTypes.male
                      ? "dot-circle-o"
                      : "circle-o"
                  }
                  size={22}
                  color="black"
                />
                <Text style={styles.genderText}>Male</Text>
              </Pressable>
              <Pressable
                style={styles.genderOption}
                onPress={() => handleGenderSelection(GenderTypes.female)}
              >
                <Icon
                  name={
                    selectedGender === GenderTypes.female
                      ? "dot-circle-o"
                      : "circle-o"
                  }
                  size={22}
                  color="black"
                />
                <Text style={styles.genderText}>Female</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.inputRowContainer}>
            <Text style={styles.inputFieldNameText}>Category</Text>
            <DropdownComponent inputStyle={styles.inputContainer} />
          </View>
          <View style={styles.inputRowContainer}>
            <Text style={styles.inputFieldNameText}>Date of Birth</Text>
            <DatePicker style={styles.inputContainer} />
          </View>
        </View>
       <Pressable style={styles.btn}>
        <Text  style={styles.btnText}>Save</Text>
       </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  registerContainer: {
    marginTop: "10%",
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    alignSelf: "center",
  },
  inputContainerWrapper: {
    flexDirection: "column",
    gap: 30,
    padding: 30,
  },
  inputRowContainer: {
    flexDirection: "row",
    gap: 30,
  },
  inputContainer: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: colors.primary,
    height: 30,
  },
  inputText: {
    flex: 1,
    padding: 0,
  },
  inputFieldNameText: {
    alignSelf: "center",
    color: colors.primary,
    fontWeight: "bold",
    flex: 0.7,
  },
  genderOption: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  genderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  btn:{
  backgroundColor: colors.primary,
  padding:10,
  alignSelf:'center',
  width:130,
  marginTop:50
  },
  btnText:{
    color:'white',
    alignSelf:'center',
    fontWeight: "bold",
    fontSize:16,
    textTransform:'uppercase'
  }

});

export default Register;
