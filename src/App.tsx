import { useEffect, useState, useCallback } from "react";
import { Grid, InputBase, CircularProgress } from "@material-ui/core/";
import ToDoItem from "./ToDoItem";
import AddToDo from "./AddToDo";
// global types are not supported in code-sandbox, so types must be imported
import { IToDo, ResponseData } from "./types";
import "./styles.css";

const URL = "https://jsonblob.com/api/jsonBlob/1037819956074659840";

export default function App() {
  const [toDos, setTodos] = useState<IToDo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTxt, setSearchTxt] = useState("");
  const [searchResults, setSearchResults] = useState<IToDo[]>([]);

  // in this case "then" syntax has better readablility than async/await
  useEffect(() => {
    window
      .fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((responseData: ResponseData) => {
        setTodos(responseData.data);
      })
      .catch((error) => {
        setErrorMsg(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  /* 
  // async/await style -
  useEffect(() => {
    async function fetchToDos() {
      try {
        const response = await window.fetch(URL);
        const responseData: ResponseData = await response.json();
        setTodos(responseData.data);
      } catch (error) {
        setErrorMsg("An error occurred");
      } finally {
        setIsLoading(false);
      }
    }
    fetchToDos();
  }, []);
  */

  useEffect(() => {
    setSearchResults(() =>
      searchTxt ? toDos.filter((toDo) => toDo.name.includes(searchTxt)) : []
    );
  }, [toDos, searchTxt]);

  const saveToDo = (newTodo: string) => {
    setTodos((oldTodos) => [
      ...oldTodos,
      {
        // to set a new unique id, find the max id of all to-dos and increment by 1
        id: Math.max(...oldTodos.map((toDo) => toDo.id)) + 1,
        name: newTodo,
        completed: false
      }
    ]);
  };

  const removeTodo = useCallback(
    (id: number) =>
      setTodos((prevState) => prevState.filter((toDo) => toDo.id !== id)),
    []
  );

  const updateToDo = useCallback(
    (updatedToDo: IToDo) =>
      setTodos((toDos) => {
        return toDos.map((toDo) => {
          if (toDo.id === updatedToDo.id) {
            return updatedToDo;
          } else {
            return toDo;
          }
        });
      }),
    []
  );

  let itemsToDisplay;
  if (searchTxt) {
    itemsToDisplay = searchResults.length ? searchResults : [];
  } else {
    itemsToDisplay = toDos;
  }

  if (isLoading) {
    return (
      <Grid container justifyContent="center">
        <CircularProgress size={80} style={{ marginTop: "10%" }} />
      </Grid>
    );
  }
  if (errorMsg) {
    // to-do: style the error message for better UX
    return errorMsg;
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        direction="column"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} className="grid-item">
          <InputBase
            id="search"
            value={searchTxt}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSearchTxt(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} className="grid-item">
          <AddToDo saveToDo={saveToDo} />
        </Grid>
        {itemsToDisplay.map((toDo: IToDo) => (
          <ToDoItem
            key={toDo.id}
            toDoItem={toDo}
            updateToDo={updateToDo}
            removeTodo={removeTodo}
          />
        ))}
      </Grid>
    </>
  );
}
