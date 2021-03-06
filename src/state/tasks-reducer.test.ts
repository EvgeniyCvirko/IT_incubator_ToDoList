import {addToDoAC, removeToDoAC, } from './todolists-reducer';
import {
    addTasksAC,
    changeStatusTasksAC,
    changeTitleTasksAC,
    removeTasksAC,
    taskObjType, TaskPriority,
    tasksReducer, TaskStatues
} from "./tasks-reducer";

const startState: taskObjType = {
    'toDoListID1': [
        {id: '1', title: "HTML&CSS",todoListId:'toDoListID1', status:TaskStatues.New,priority: TaskPriority.Low,
            startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
        {id: '2', title: "JS",todoListId:'toDoListID1', status:TaskStatues.Completed,priority: TaskPriority.Low,
            startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
        {id: '3', title: "ReactJS", todoListId:'toDoListID1', status:TaskStatues.New,priority: TaskPriority.Low,
            startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
        {id: '4', title: "Redux", todoListId:'toDoListID1', status:TaskStatues.New,priority: TaskPriority.Low,
            startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
    ],
    'toDoListID2': [
        {id: '1', title: "Beer", todoListId:'toDoListID2', status:TaskStatues.New,priority: TaskPriority.Low,
            startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
        {id: '2', title: "Crisps", todoListId:'toDoListID1', status:TaskStatues.Completed,priority: TaskPriority.Low,
            startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
        {id: '3', title: "Fish",todoListId:'toDoListID2', status:TaskStatues.New,priority: TaskPriority.Low,
            startDate:new Date(), addedDate: new Date(), deadline: new Date(), order: 0, description: '', completed: false},
    ],
}
test('correct tasks should be changed status', () => {

 const action = changeStatusTasksAC('2', TaskStatues.New,'toDoListID2')
    const endState = tasksReducer(startState,action )
    expect(endState['toDoListID1'][1].status).toBe(TaskStatues.Completed)
    expect(endState['toDoListID2'][1].status).toBe(TaskStatues.New)
});

test( 'correct tasks should be removed', ()=>{

    const action = removeTasksAC('toDoListID1', '2')
    const endState = tasksReducer(startState, action)
    expect(endState['toDoListID1'].length).toBe(3)
    expect(endState['toDoListID1'][0].id).toBe('1')
    expect(endState['toDoListID1'][1].id).toBe('3')
    expect(endState['toDoListID2'].length).toBe(3)
})

test( 'correct tasks should be changed title', ()=>{

    const action = changeTitleTasksAC('toDoListID1', '2', 'Milk')
    const endState = tasksReducer(startState, action)
    expect(endState['toDoListID1'][1].title).toBe('Milk')
    expect(endState['toDoListID2'][1].title).toBe("Crisps")
})
test( 'correct tasks should be add', ()=>{

    const action = addTasksAC( 'Car','toDoListID1', )
    const endState = tasksReducer(startState, action)
    expect(endState['toDoListID1'].length).toBe(5)
    expect(endState['toDoListID2'].length).toBe(3)
    expect(endState['toDoListID1'][0].title).toBe('Car')
    expect(endState['toDoListID1'][0].status).toBe(TaskStatues.New)
    expect(endState["toDoListID1"][0].id).toBeDefined();
})
test( 'correct tasks should be add when add Todolist', ()=>{

    const action = addToDoAC( 'What to learn' )
    const endState = tasksReducer(startState, action)
    const key = Object.keys(endState)
    const newKey = key.find(k => k !== 'toDoListID2' && k !== 'toDoListID1' )
    if( !newKey) {
          throw Error("Error: key is not find ")
    }
    expect( key.length).toBe(3);
    expect(endState[newKey]).toEqual([]);

})
test( 'correct tasks should be remove when add Todolist', ()=>{

    const action = removeToDoAC( 'toDoListID2' )
    const endState = tasksReducer(startState, action)
    expect( Object.keys(endState).length).toBe(1);
    expect(endState['toDoListID1'].length).toBe(4);
})
