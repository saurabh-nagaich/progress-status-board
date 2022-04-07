import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import styled from "styled-components"
import Task from './Task';

const Container= styled.div`
    margin:8px;
    border:1px solid lightgrey;
    border-radius:2px;
    width:220px;

    display:flex;
    flex-direction:column;
`;
const Title = styled.h3`
    padding:8px;
`;
const TaskList = styled.div`
    padding:8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    min-height:100px
`;

function Column(props) {
  return (
    <Container>
        <Title>{props.column.title}</Title>
        <Droppable 
          droppableId={props.column.id}
          isDropDisabled={props.isDropDisabled}
        >
          {(provided,snapShot)=>(
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapShot.isDraggingOver}
            >
              {props.tasks.map((task,index)=><Task key={task.id} task={task} index={index} />)}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
    </Container>
  )
}

export default Column