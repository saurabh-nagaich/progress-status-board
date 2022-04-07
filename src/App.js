import "@atlaskit/css-reset"
import './App.css';
 
import initialData from './data/initial-data';
import { useState } from 'react';
import Column from './components/Column';
import { DragDropContext } from "react-beautiful-dnd";

import styled from 'styled-components';
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
 display:flex;
`;

function App() {
  const [data,setData] = useState(initialData)
  const [homeId,setHomeId] = useState(null)


  const onDragStart=(start)=>{
    const homeIndex = data.columnOrder.indexOf(start.source.droppableId);

    setHomeId({
      homeIndex,
    });
  }
  const onDragUpdate=update=>{
    const { destination } = update;
    // const opacity = destination 
    //   ? destination.index /Object.keys(data.tasks).length
    //   : 0;
    // document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`  
  }

  const onDragEnd = result =>{

    setHomeId(null);

    const {destination, source, draggableId,type } = result;

    if(!destination) {
      return;
    }

    if(type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
     
      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
     }
   
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if(start===finish){
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
     
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
     
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newState);
      return;
    }
   
    //Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index,1);
    const newStart = {
      ...start,
      taskIds:startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index,0,draggableId);
    const newFinish={
      ...finish,
      taskIds:finishTaskIds,
    }

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  }

  return (
    <DragDropContext 
      onDragStart={onDragStart} 
      onDragUpdate={onDragUpdate} 
      onDragEnd={onDragEnd} 
    >
      <Droppable droppableId="allColumns" direction="horizontal" type="column">
        {
          provided=>(
            <Container
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {
                data.columnOrder.map((columnId,index)=>{
                  const column = data.columns[columnId];
                  const tasks = column.taskIds.map(taskId=>data.tasks[taskId])
                  const isDropDisabled = index<data.homeIndex
                  return <Column key={column.id} index={index} column={column} tasks={tasks} isDropDisabled={isDropDisabled} />
                })
              }
              {provided.placeholder}
            </Container>
          )
        }
      </Droppable>
    </DragDropContext>
  );
}

export default App;
