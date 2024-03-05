import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/Entypo";
import colors from "../../theme/colors";

const data = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
];

interface DropdownComponentProps {
  onSelectCategory: (category: string) => void;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  onSelectCategory,
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onSelectCategory(item.value);
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <Icon
            style={styles.icon}
            color={colors.primary}
            name={isFocus ? "triangle-up" : "triangle-down"}
            size={28}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdown: {
    height: 30,
    borderColor: colors.primary,
    borderWidth: 0.5,
    paddingHorizontal: 8,
  },
  icon: {
    borderColor: colors.primary,
    borderLeftWidth: 0.5,
    borderLeftColor: colors.primary,
    borderWidth: 0.5,
    marginRight: -8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.primary,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
