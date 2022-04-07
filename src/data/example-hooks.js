// onDragStart
const start = {
    draggableId:"task-1",
    type:'TYPE',
    source:{
        droppableId:"colums-1",
        index:0,
    }
}

//onDragUpdate
const update={
    ...start,
    destination:{
        droppableId:"colums-1",
        index:1,
    }
}

// onDragEnd 
const result = {
    ...update,
    reason:"DROP"
}