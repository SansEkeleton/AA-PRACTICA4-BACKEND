import express, {Request, Response, request, response} from 'express'
const app = express()

app.use(express.json());

type employees = {
    id: number 
    cedula: string
    fullname: string
    pricePerHour: number
}

type workedHour = {
    employeedid: string,
    hours: number
}

const employee: employees[] = [
    {id: 1, cedula: '001-000-000', fullname: 'Pedro Pascal', pricePerHour: 50},
    {id: 2, cedula: '002-000-002', fullname: 'Roberto Marte', pricePerHour: 50},
    {id: 3, cedula: '003-000-003', fullname: 'Juan del Monte', pricePerHour: 50}
    
]
const workedHour: workedHour[] = [
    {employeedid: '1', hours:40},
    {employeedid: '2', hours:40}
]

app.get('/employees', (request:Request, response:Response)=>{
    response.json(employee)
})

app.get('/employees/:id', (request: Request, response: Response) => {
    const id = request.params.id;

    if (isNaN(Number.parseInt(id))) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `id: ${id} is Not a Number`
        })
    }

    const employees =  employee.find((u: employees) => u.id === Number.parseInt(id));

    if (!employees) {
        return response.status(404).json({
            statusCode: 404,
            statusValue: 'Not Found',
            message: `The user with id ${id} was not found`
        })
    }

    response.json({
        statusCode: 200,
        statusValue: 'OK',
        data: employees
    });
});

app.get('employees/:id/hours', (request:Request, response:Response)=>{
    const id = request.params.id
    if(isNaN(Number.parseInt(id))){
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `id: ${id} is not a number`
        })
    }

    const hours = workedHour.find((h: workedHour) => h.hours === Number.parseInt(id))
})
const port = 3000
app.listen(port, ()=> console.log(`Server is running at port ${port}`))