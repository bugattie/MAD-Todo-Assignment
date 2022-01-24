import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { AntDesign, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchList, setSearchList] = useState();

  const handleChange = (e, setState) => {
    setState(e);
  };

  const submitHandler = async () => {
    if ((description && title) !== "") {
      let newTodoItems = [
        ...todoList,
        { title: title, description: description, status: false },
      ];
      setTodoList(newTodoItems);

      await AsyncStorage.setItem("List", JSON.stringify(newTodoItems));
    }
  };

  const deleteItemHandler = (item) => {
    const deleteTodo = todoList.filter((data, index) => index != item);
    setTodoList(deleteTodo);
  };

  const updateStatusHandler = (item) => {
    const previsousData = {
      description: item?.item?.description,
      title: item?.item?.title,
      status: !item?.item?.status,
    };

    const doneTask = todoList.filter((data, index) => index != item?.index);
    let newTodoItems = [...doneTask, previsousData];
    setTodoList(newTodoItems);
  };

  const searchTitleHandler = (e) => {
    const searchListValue = todoList.filter((data) => data?.title == e);
    setSearchList([searchListValue]);
  };

  const TodoData = (item) => {
    return (
      <>
        <View
          style={styles.itemContainer}
        >
          <View>
            <Checkbox
              status={item?.item?.status ? "checked" : "unchecked"}
              onPress={() => {
                updateStatusHandler(item);
              }}
            />
          </View>
          <View>
            <Text>{item?.item?.title}</Text>
            <Text>{item?.item?.description}</Text>
          </View>
          <TouchableOpacity onPress={() => deleteItemHandler(item?.index)}>
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>Todo List</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Title"
            onChangeText={(e) => searchTitleHandler(e)}
          />
          <TouchableOpacity style={styles.searchBtn}>
            <Text style={styles.fontColor}>Search</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter Title"
          onChangeText={(e) => handleChange(e, setTitle)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Description"
          onChangeText={(e) => handleChange(e, setDescription)}
        />

      </View>
      <TouchableOpacity
        onPress={submitHandler}
        style={styles.submitBtn}
      >
        <Text style={styles.fontColor}>Submit</Text>
      </TouchableOpacity>
      <FlatList
        extraData={todoList}
        renderItem={TodoData}
        data={todoList}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },

  heading: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
  },
  searchContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitBtn: {
    borderWidth: 1,
    alignItems: "center",
    margin: 30,
    justifyContent: "center",
    padding: 10,
    borderColor: "#D9647C",
    backgroundColor: "#FFB5BA",
  },
  searchBtn: {
    height: 38,
    padding: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#D9647C",
    backgroundColor: "#FFB5BA",
  },
  listContainer: {
    padding: 10,
  },
  fontColor: {
    color: '#FFF'
  },
  itemContainer: {
    margin: 30,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#F6F7F9",
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  }
});

export default App;