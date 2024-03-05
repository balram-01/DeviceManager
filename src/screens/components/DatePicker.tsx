import React, { useState } from "react";
import { Button, Pressable, Text } from "react-native";
import DatePicker from "react-native-date-picker";
import colors from "../../theme/colors";
import Icon from "react-native-vector-icons/Entypo";

interface DatePickerProps {
  onSelectDate: (date: Date) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  onSelectDate,
  style,
}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const formattedDate = `${date.getDate()}-${date.toLocaleString("default", {
    month: "short",
  })}-${date.getFullYear()}`;

  return (
    <>
      <Pressable
        style={[style, { flexDirection: "row" }]}
        onPress={() => setOpen(true)}
      >
        <Text
          style={{
            color: colors.primary,
            marginStart: 10,
            alignSelf: "center",
            flex: 1,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {formattedDate}
        </Text>
        <Icon
          color={colors.primary}
          name={open ? "triangle-up" : "triangle-down"}
          size={28}
          style={{
            borderColor: colors.primary,
            borderLeftWidth: 0.5,
            borderLeftColor: colors.primary,
            borderWidth: 0.5,
          }}
        />
      </Pressable>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(selectedDate) => {
          setOpen(false);
          setDate(selectedDate);
          onSelectDate(selectedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default CustomDatePicker;
