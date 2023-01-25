# <h1 align="center"> @DECORATORS-TS/EXCEPTION-LOGS </h1>
### version: 0.0.6

# :bookmark_tabs: About the Project
Based on design patterns decorators, this functionality will allow you to implement an exception log decorator that brings you custom information...

# :pushpin: How to install and run the project

### Install

```bash
yarn add -D @decorators-ts/exceptions-logs
```
or

```bash
npm install -D @decorators-ts/exceptions-logs
```

### :question: How does this help me?

As seen in the images above, the decorator implements custom logs, thus, sending you the controller execution time and also the error reason, if it happens

### How to use?

### :globe_with_meridians: Exception Decorators

```bash
 import { Execpetion } from '@decorators-ts/exceptions-logs'
```

on the top line of your class function, invoke the method


```bash
  @Execpetion({
      methodName: 'DevelopmentController',
  })
```
###  parameters
  - methodName: (String) - Name of the class or function to be executed
  - execeptionError: (Error | any) - By default it will return a new Error('Internal Server Error'), but if you want to customize the return in case of an error, make the notation in this parameter

###  return
  - the event tasks will be displayed in your console, thus delivering customized information in case of error or success

### EXAMPLE
```bash
    import { Execpetion } from '@decorators-ts/exceptions-logs'

    interface IDevelpmentController {
        running: (into: string) => Promise<string>
    }

    class DevelopmentController implements IDevelpmentController {

        @Execpetion({
            methodName: 'DevelopmentController',
        })
        public async running (arg: string): Promise<string> {
            return arg
        }
    }
```

my console in execution success
```bash
    [INFO - LOGGER ID: kdhp155] EXECUTION RUNNING -  13:55:23 - 23/10/2022 13:55:23 | - [RUNNING] DevelopmentController
    [INFO - LOGGER ID: kdhp155] EXECUTION SUCCESS -  13:55:23 - 23/10/2022 13:55:23 | - [FINALLY] DevelopmentController - [TASK EVENT: 0.005 ms]
```

my console in execution fails
```bash
    [INFO - LOGGER ID: 91by155] EXECUTION RUNNING -  13:55:28 - 23/10/2022 13:55:28 | - [RUNNING] DevelopmentController
    [INFO - LOGGER ID: 91by155] EXECUTION FAILED  -  13:55:28 - 23/10/2022 13:55:28 | - [FINALLY] DevelopmentController - [TASK EVENT LOGGER ERROR: args is not defined]
    [INFO - LOGGER ID: 91by155] EXECUTION FAILED  -  13:55:28 - 23/10/2022 13:55:28 | - [FINALLY] DevelopmentController - [TASK EVENT DEBUG ERROR : ['YOUT PATH OR FILE ERROR']]
```

### :globe_with_meridians: Parameters Required Decorators
```bash
  import { ValidateRequired, Required } from '@decorators-ts/exceptions-logs'
```

###  parameters
   - this new update the field validation resources are more advanced!!
   - indicate the required input parameters in an array
   - identify as @Required in the parameter receiving field

###  return
  - in eventual confirmation of mandatory parameter, it will generate an error

### EXAMPLES
```bash
  @ValidateRequired([
    {
      name: 'name',
      type: 'string',
      required: true,
      maxLength: 11
    }
  ])
```

```bash
  @ValidateRequired([
    {
      isArray: true,
      typeOfArray: 'object',
      nameOfArray: 'users',
      fieldsArray: [{ name: ['string', true], age: ['number', false] }]
    }
  ])
```

   - Use different validators, which even validate objects inside arrays


```bash
  @ValidateRequired([
    {
      isArray: true,
      typeOfArray: 'object',
      nameOfArray: 'users',
      fieldsArray: [{ name: ['string', true], age: ['number', false] }]
    }
    {
      name: 'name',
      type: 'string',
      required: true,
      maxLength: 11
    }
  ])
```

```bash
  public async running (@Required args: IArgs): Promise<void> {}
```

```bash
interface IMyPropsParameters {
  users?: any
  id: number
  age: number
}

class parameters {
  @ValidateRequired([
    {
      isArray: true,
      typeOfArray: 'object',
      nameOfArray: 'users',
      fieldsArray: [{ name: ['string', true], age: ['number', false] }]
    },
    {
      name: 'id',
      type: 'number',
      required: true
    },
    {
      name: 'age',
      type: 'number',
      required: true
    }
  ])
  async paramters (@Required props: IMyPropsParameters) {

  }
}

class service {
  async validated () {
    try {
      await new parameters().paramters({
        users: [
          { name: 'Christian' }
        ],
        id: 4569,
        age: 4
      })
    } catch (e) {
      console.error(e)
    }
  }
}

new service().validated()
  .then()
  .catch()

```