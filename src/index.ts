import express, { Request, Response } from 'express';
const app = express()

app.use(express.json());

type employees = {
    id: number 
    cedula: string
    fullname: string
    pricePerHour: number
}

type workedHour = {
    employeedid: number,
    hours: number
}
let id_sequence = 0;
const employee: employees[] = []
const workedHour: workedHour[] = []

app.get('/employees', (request:Request, response:Response)=>{
    response.json(employee)
})

app.get('/employees/:id', (request: Request, response: Response) => {
    const id = request.params.id;

    if (isNaN(Number.parseInt(id))) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `Invalid user ID`
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

app.get('/employees/:id/hours', (request:Request, response:Response)=>{
    const id = Number.parseInt(request.params.id)
    if(isNaN(id)){
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `invalid user ID`
        })
    }

    const empl = employee.find((u:employees) => u.id === id) 

    if(!empl){
        return response.status(404).json({
            statusCode: 404,
            statusValue: 'Not Found',
            message: `The user with id ${id} was not found`
        })
    }

    const hours = workedHour.filter((record) => record.employeedid === id)

    response.json({
        statusCode: 200,
        statusValue: 'OK',
        data: hours
    })
})


app.get('/employees/:id/salary', (request:Request, response:Response)=>{
    const id = parseInt(request.params.id)
    if(isNaN(id)){
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `id: ${id} is not a number`
        })
    }

    const empl = employee.find((u:employees) => u.id === id) 

    if(!empl){
        return response.status(404).json({
            statusCode: 404,
            statusValue: 'Not Found',
            message: `The user with id ${id} was not found`
        })
    }


    const hours = workedHour.filter((record) => record.employeedid === id)
    const totalHours = hours.reduce((total, record) => total + record.hours, 0)
    const salary = totalHours * empl.pricePerHour

    response.json({
        statusCode: 200,
        statusValue: 'OK',
        data: {
            employee: empl,
            hours: totalHours,
            salary: salary
        }
    })
})

app.post('/employees', (request: Request, response: Response) => {
    const { cedula, fullname, pricePerHour } = request.body;
    
    const existingUserCedula = employee.find((u: employees) => u.cedula === cedula);
    if (existingUserCedula) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `El usuario con la cedula ${cedula} ya existe`
        });
    }

    const existingUserFullname = employee.find((u: employees) => u.fullname === fullname);
    if (existingUserFullname) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `El usuario con el nombre ${fullname} ya existe`
        });
    }

    if (!cedula || cedula.trim().length === 0) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: 'Cedula is required'
        });
    }

    if (!fullname || fullname.trim().length === 0) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: 'fullname is required'
        });
    }

    if (isNaN(pricePerHour)) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: 'pricePerHour must be a number'
        });
    }
    
    
    id_sequence += 1;
    const newEmployee = {
        id: id_sequence,
        cedula,
        fullname,
        pricePerHour
    
    }

    employee.push(newEmployee);
    response.status(201).json(newEmployee);
});


app.post('/employees/:id/hours', (request: Request, response: Response) => {
    const id = Number.parseInt(request.params.id);
    const { hours } = request.body;
    if(isNaN(id)){
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `id: ${id} is not a number`
        });
    };

    const empl = employee.find((u:employees) => u.id === id);
    if(!empl){
        return response.status(404).json({
            statusCode: 404,
            statusValue: 'Not Found',
            message: `The user with id ${id} was not found`
        });
    };

    const newRecord: workedHour = {employeedid: id, hours};
    workedHour.push(newRecord);

    response.status(201).json(newRecord);
});

app.put('/employees/:id', (request: Request, response: Response) => {
    const id = request.params.id;
    const {fullname, pricePerHour} = request.body;

    if (isNaN(Number.parseInt(id))) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `id: ${id} is Not a Number`
        })
    }

    if (fullname.trim().length === 0) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `fullname is required`
        })
    }

    if (isNaN(pricePerHour)) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `pricePerHour must be a number`
        })
    }

    const employeeIndex = employee.findIndex((u: employees) => u.id === Number.parseInt(id));
    if (employeeIndex === -1) {
        return response.status(404).json({
            statusCode: 404,
            statusValue: 'Not Found',
            message: `The user with id ${id} was not found`
        })
    }

employee[employeeIndex].fullname = fullname;
employee[employeeIndex].pricePerHour = pricePerHour;

response.status(200).json({
        tatusCode: 200,
        tatusValue: 'OK',
        message: `Employee with id ${id} has been updated`,
    
});
})
app.delete('/employees/:id', (request: Request, response: Response) => {
    const id = request.params.id;
    if (isNaN(Number.parseInt(id))) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `id: ${id} is Not a Number`
        })
    }

    const employeeIndex = employee.findIndex((u: employees) => u.id === Number.parseInt(id));
    if (employeeIndex === -1) {
        return response.status(404).json({
            statusCode: 404,
            statusValue: 'Not Found',
            message: `The user with id ${id} was not found`
        })
    }

    const deleteEmployee = employee.splice(employeeIndex, 1);
    const deletedHours = workedHour.filter((record) => record.employeedid === Number.parseInt(id));

    response.status(200).json({
        statusCode: 200,
        statusValue: 'OK',
        message: `The user with id ${id} has been deleted`,
        deletedHours,
        deleteEmployee
    });
})

app.listen(3000, ()=> console.log(`Server is running at port 3000`));