# SDE Project

This is the official API documentation for the SDE Project.

------------------------------------------------------------------------------------------
## Adapters

#### EVA Adapter

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(check if the service is running)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | EVA API adapter is running                                          |

</details>


<details>
 <summary><code>GET</code> <code><b>/checkEmail</b></code> <code>(Get information about the validity of an email from EVA)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `email`           |  required | string         | The email to validate               |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |

##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  status: "success",
  msg: "Email status retrieved",
  data: {
    valid_syntax: true,
    disposable: true,
    deliverable: true,
    spam: false
  }
}
```

</details>


#### Database Interface


<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(check if the service is running)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | MySQL db interface is running                                       |

</details>



<details>
 <summary><code>GET</code> <code><b>/findUser</b></code> <code>(Search for a registered user in the DB)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `email`           |  required | string         | The user's email                    |
> | `password`        |  required | string         | The user's password                 |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |
> | `404`         | `application/json`                | `{status: "error", msg: "User not found"}`                          |

##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  status: "success",
  msg: "User found",
  user_info: {
    id: 123,
    name: "Mario",
    surname: "Rossi",
    email: "mariorossi@test.com",
  }
}
```

</details>


<details>
 <summary><code>POST</code> <code><b>/registerUser</b></code> <code>(Register a new user in the DB)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `name`            |  required | string         | The user's name                     |
> | `surname`         |  required | string         | The user's surname                  |
> | `email`           |  required | string         | The user's email                    |
> | `password`        |  required | string         | The user's password                 |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |

##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  status: "success",
  msg: "User registered",
  id: 123
}
```

</details>

------------------------------------------------------------------------------------------
## Business Logic


#### Login


<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(check if the service is running)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | Login business logic is running                                     |

</details>


<details>
 <summary><code>POST</code> <code><b>/login</b></code> <code>(Authenticate the user using the normal DB authentication)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `email`           |  required | string         | The user's email                    |
> | `password`        |  required | string         | The user's password                 |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |
> | `401`         | `application/json`                | `{status: "error", msg: "Invalid credentials"}`                     |

##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  status: "success",
  msg: "User login successful",
  token: "eyJ..."
}
```

</details>



#### Registration


<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(check if the service is running)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | Registration business logic is running                              |

</details>


<details>
 <summary><code>POST</code> <code><b>/registration</b></code> <code>(Register the user using the DB)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `name`            |  required | string         | The user's name                     |
> | `surname`         |  required | string         | The user's surname                  |
> | `email`           |  required | string         | The user's email                    |
> | `password`        |  required | string         | The user's password                 |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |

##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  status: "success",
  msg: "User registered",
  id: 123
}
```

</details>
