import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
 border: 1px solid lightgrey;
 border-radius: 2px;
 padding: 8px;
 margin-bottom: 8px;
 background-color:${(props)=>props.isDragging?"lightgreen":"white"};
 display:flex;
`;

const Handle = styled.div`
  width:20px;
  height:20px;
  background-color:orange;
  border-radius:4px;
  margin-right:8px
`

function Task(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {
        (provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {/* Custom Handler */}
            <Handle {...provided.dragHandleProps} />
            {props.task.content}
          </Container>
        )
      }
    </Draggable>
    
  )
}

export default Task