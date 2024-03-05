import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Table, Row, Rows } from "react-native-reanimated-table";
import colors from "../../theme/colors";

const CandidateTable: React.FC = () => {
  const [tableHead, setTableHead] = useState<string[]>([
    "Candidate List",
    "Auto ID",
  ]);
  const [tableHead2, setTableHead2] = useState<string[]>([
    "Candidate Name",
    "Gender",
    "DOB",
    "Category",
    "Is Active",
    "",
  ]);
  const [tableData, setTableData] = useState<string[][]>([
    ["John Doe", "Male", "13/10/2001", "A", "true", "10"],
  ]);
  const [tableTitle, setTableTitle] = useState<string[]>(["Name 1", "Name 2"]);

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        <Row
          data={tableHead2}
          style={styles.head2}
          textStyle={styles.head2Text}
        />

        <Rows data={tableData} style={styles.row} textStyle={styles.text} />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: colors.primaryContainer },
  row: { minHeight: 28 },
  text: { textAlign: "center" },
  head2: { height: 40, backgroundColor: colors.secondaryContainer },
  head2Text: { color: colors.primary, fontWeight: "bold", alignSelf: "center" },
});

export default CandidateTable;
