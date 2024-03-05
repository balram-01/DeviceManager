import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Table, Row, Rows } from "react-native-reanimated-table";
import colors from "../../theme/colors";
import { fetchCandidates } from "../../services/sqlite/db";
import { useFocusEffect } from "@react-navigation/native";

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
  const [tableData, setTableData] = useState<string[][]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const candidates = await fetchCandidates();
          setTableData(candidates);
          console.log("candidates: " + JSON.stringify(candidates));
        } catch (error) {
          console.error("Error fetching candidates: ", error);
        }
      };

      fetchData();

      return () => {
        // Cleanup if needed
      };
    }, [])
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={tableHead}
            flexArr={[5.1, 1]}
            style={styles.head}
            textStyle={[styles.text, { fontSize: 14,alignSelf:'flex-start',padding:1,color:'white',fontWeight:"900"}]}
          />
          <Row
            data={tableHead2}
            style={styles.head2}
            textStyle={styles.head2Text}
          />

          {tableData.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              style={[
                styles.row,
                index % 2
                  ? { backgroundColor: colors.secondaryContainer }
                  : { backgroundColor: colors.tertioryContainer },
              ]}
              textStyle={styles.text}
            />
          ))}
        </Table>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: colors.primaryContainer },
  row: { minHeight: 28 },
  text: { textAlign: "center", color: colors.primary },
  head2: { height: 40, backgroundColor: colors.secondaryContainer },
  head2Text: {
    color: colors.primary,
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 12,
    textAlign: "center",
  },
});

export default CandidateTable;
