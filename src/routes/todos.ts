import {Router} from 'express';

// named exports we need to import with this below named import syntax which simply uses curly braces and then between them the name which we want to import

import { Todo } from '../models/todo';

type RequestBody = {id:string, text: string};

let todos:Todo[]=[];

const router = Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({todos: todos});
})

router.post('/todo',(req,res,next)=>{
    const body=req.body as RequestBody;
    const newTodo : Todo={
        id:new Date().toISOString(),
        text:body.text
    };

    todos.push(newTodo);

    res.status(200).json({messsage:'Added todo',todos: todos, newTodo:newTodo});
})


router.delete('/delete-todo',(req,res,next)=>{
    const body=req.body as RequestBody;
    const id=body.id;

    const todoIndex=todos.findIndex(todoItem=> todoItem.id==id);

    if(todoIndex >=0){
        
        todos=todos.filter(todoItem=>todoItem.id != id);
   
        res.status(200).json({message:'deleted todo', todos:todos});
    }
    else{

        res.status(400).json({message:'could not find todo for this id'})
    }

   
})


router.put('/update-todo',(req,res,next)=>{
    const body=req.body as RequestBody;
    const tid=body.id;
    const newText=body.text;

    const todoIndex=todos.findIndex(todoItem=> todoItem.id==tid);

    if(todoIndex >=0){
        
        todos[todoIndex]={
            id:todos[todoIndex].id,
            text:newText
        };

        res.status(200).json({message:'updated todo'});
    }
    else{

        res.status(400).json({message:'could not find todo for this id'})
    }


})


//for default export we can omit the curly braces while importing and just pick any name of our choice. e.g. import todosRoutes from './routes/todos';
export default router;