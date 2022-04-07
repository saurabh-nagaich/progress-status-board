import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
 border: 1px solid lightgrey;
//  border-radius: 50%;
 padding: 8px;
 margin-bottom: 8px;
//  width:40px;
//  height:40px;
 background-color: ${props => 
  props.isDragDisabled
    ?'lightgrey'
    : props.isDragging 
    ? 'lightGreen' 
    : 'white'};
  display:flex;
  justify-content:center;
  align-items:center;

  &:focus{
    ouline:none;
    border-color:red;
  }
`;

const Handle = styled.div`
  width:20px;
  height:20px;
  background-color:orange;
  border-radius:4px;
  margin-right:8px
`

function Task(props) {
  // const isDragDisabled = props.task.id==='task-1'
  const isDragDisabled =false
  return (
    <Draggable 
      draggableId={props.task.id} 
      index={props.index}
      isDragDisabled={isDragDisabled}
    >
      {
        (provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
          >
            {/* Custom Handler */}
            {/* <Handle {...provided.dragHandleProps} /> */}
            {props.task.content}
          </Container>
        )
      }
    </Draggable>
    
  )
}

export default Task