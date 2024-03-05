import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  Alert,
} from "react-native";
import colors from "../../theme/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import DropdownComponent from "../components/DropDown";
import DatePicker from "../components/DatePicker";
import { saveCandidateData } from "../../services/sqlite/db";

interface IRegisterProps {}

enum GenderTypes {
  male = "male",
  female = "female",
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const [candidateName, setCandidateName] = React.useState<string>("");
  const [selectedGender, setSelectedGender] = React.useState<
    GenderTypes | undefined
  >();
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [dateOfBirthError, setDateOfBirthError] = React.useState<string>("");
  const [candidateNameError, setCandidateNameError] = React.useState<string>(
    ""
  );
  const [selectedGenderError, setSelectedGenderError] = React.useState<string>(
    ""
  );
  const [selectedCategoryError, setSelectedCategoryError] = React.useState<
    string
  >("");

  const handleCandidateNameChange = (text: string) => {
    setCandidateName(text);
    setCandidateNameError("");
  };

  const handleGenderSelection = (gender: GenderTypes | undefined) => {
    setSelectedGender(gender);
    setSelectedGenderError("");
  };

  const handleDateOfBirthChange = (date: Date | null) => {
    setDateOfBirth(date);
    setDateOfBirthError("");
  };

  const handleSave = () => {
    // Validate fields
    let isValid = true;

    if (!candidateName.trim()) {
      setCandidateNameError("Candidate name is required");
      isValid = false;
    }

    if (!selectedGender) {
      setSelectedGenderError("Gender is required");
      isValid = false;
    }

    if (!dateOfBirth) {
      setDateOfBirthError("Date of birth is required");
      isValid = false;
    } else {
      const today = new Date();
      let age = today.getFullYear() - dateOfBirth.getFullYear();
      const monthDiff = today.getMonth() - dateOfBirth.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
      ) {
        age--;
      }
      if (age < 18) {
        setDateOfBirthError("You must be at least 18 years old");
        isValid = false;
      }
    }

    if (!selectedCategory) {
      setSelectedCategoryError("Category is required");
      isValid = false;
    }

  if(isValid){
    saveCandidateData(candidateName, selectedGender, dateOfBirth, selectedCategory)
    .then((success) => {
      if (success) {
        // Alert message when user created successfully
        Alert.alert('Success', 'User created successfully!', [{ text: 'OK' }]);
      } else {
        // Alert message when user already exists
        Alert.alert('Duplicate User', 'User already exists.', [{ text: 'OK' }]);
      }
    })
    .catch(error => {
      // Handle error if saveCandidateData fails
      console.error('Error while saving candidate data:', error);
      Alert.alert('Error', 'Failed to save user data. Please try again later.', [{ text: 'OK' }]);
    });
  }
  };

  return (
    <View style={styles.container}>
      <View style={styles.registerContainer}>
        <Text style={styles.headerText}>Register</Text>
        <View style={styles.inputContainerWrapper}>
          <View style={styles.inputRowContainer}>
            <Text style={styles.inputFieldNameText}>Candidate Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                onChangeText={handleCandidateNameChange}
                value={candidateName}
              />
            </View>
          </View>
          {candidateNameError ? (
            <Text style={styles.errorText}>{candidateNameError}</Text>
          ) : null}
          <View style={styles.inputRowContainer}>
            <Text style={styles.inputFieldNameText}>Gender</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 ,flex:1}}
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
          {selectedGenderError ? (
            <Text style={styles.errorText}>{selectedGenderError}</Text>
          ) : null}
          <View style={styles.inputRowContainer}>
            <Text style={styles.inputFieldNameText}>Category</Text>
            <DropdownComponent
              onSelectCategory={(category) => {
                setSelectedCategory(category);
                setSelectedCategoryError(""); // Clear previous error message
              }}
            />
          </View>
          {selectedCategoryError ? (
            <Text style={styles.errorText}>{selectedCategoryError}</Text>
          ) : null}
          <View style={styles.inputRowContainer}>
            <Text style={styles.inputFieldNameText}>Date of Birth</Text>
            <DatePicker
              style={styles.inputContainer}
              onSelectDate={(date) => {
                handleDateOfBirthChange(date);
                setDateOfBirthError(""); // Clear previous error message
              }}
            />
          </View>
          {dateOfBirthError ? (
            <Text style={styles.errorText}>{dateOfBirthError}</Text>
          ) : null}
        </View>
        <Pressable style={styles.btn} onPress={handleSave}>
          <Text style={styles.btnText}>Save</Text>
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

    padding: 30,
  },
  inputRowContainer: {
    flexDirection: "row",
    gap: 30,
    marginTop: 30,
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
    color:colors.primary,
    paddingHorizontal:10
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
  btn: {
    backgroundColor: colors.primary,
    padding: 10,
    alignSelf: "center",
    width: 130,
    marginTop: 50,
  },
  btnText: {
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default Register;
