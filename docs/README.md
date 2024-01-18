# API Documentation

This is the official API documentation for the SDE Project.

------------------------------------------------------------------------------------------
## Data
#### Text similiarities

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(check if the api is running)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | Text similiarities api is running                                   |

</details>

<details>
 <summary><code>POST</code> <code><b>/findCorrelation</b></code> <code>(Returns the 10 texts most similar to a word)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                                                |
> |-------------------|-----------|----------------|------------------------------------------------------------|
> | `texts`           |  required | []             | Array of texts that wil be filtered using the word         |
> | `word`            |  required | string         | Search criteria                                            |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | Text similiarities api is running                                   |

##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  texts: [
    "text1",
    "text2",
    ...
  ]
}
```

</details>


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

<details>
 <summary><code>POST</code> <code><b>/addTeam</b></code> <code>(Add a new team to the interests of the user)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `token`           |  required | string         | Token containing the user ID        |
> | `teamId`          |  required | string         | The team ID                         |
> | `leagueId`        |  required | string         | The league ID of the team           |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | `{status: "success", msg: "team added"}`                            |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |
> | `401`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |

</details>


<details>
 <summary><code>POST</code> <code><b>/removeTeam</b></code> <code>(Remove a team from the interests of the user)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `token`           |  required | string         | Token containing the user ID        |
> | `teamId`          |  required | string         | The team ID                         |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | `{status: "success", msg: "team deleted"}`                          |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |
> | `401`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |

</details>

<details>
 <summary><code>GET</code> <code><b>/getTeams</b></code> <code>(Get teams from the interests of the user)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `token`           |  required | string         | Token containing the user ID        |
> | `teamId`          |  required | string         | The team ID                         |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |
> | `401`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |

##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  status: "success",
  result:[{
    userId:1,
    teamId:2,
    leagueId:3
   },{
    userId:1,
    teamId:4,
    leagueId:5
   }]
  }
}
```

</details>

#### HTML Adapter

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(check if the service is running)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | HTML Adapter is running                                       |

</details>


<details>
 <summary><code>GET</code> <code><b>/getHtml</b></code> <code>(Returns the HTML code of a specified url)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `url`             |  required | string         | The website url, which must be encoded and written in this format                   |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `500`         | `application/json`                | `{status: "Internal Server Error", msg: "The server encou... "}`    |

##### Example
The url in the GET request must be encoded like in the following example, that request the HTML text of www.python.org

```
html_adapter_url:html_adapter_port/getHtml?url=https%3A%2F%2Fwww.python.org
```

If the status code is `200`, the endpoint returns a JSON object that contains the HTML text of the requested website.

```json
{
  html: "<!doctype html>\n<!--[if lt IE 7]>   <html class=\"no-js ie6 lt-ie7 lt-ie8 lt...",
}
```
</details>

#### RSS Adapter

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(check if the service is running)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | RSS Adapter is running                                              |

</details>

<details>
 <summary><code>GET</code> <code><b>/feeds</b></code> <code>(Returns the list of RSS feeds)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |

##### Example

If the status code is `200`, the endpoint returns a JSON object that contains the URLs of the RSS feeds.

```json
{
    1: "url1",
    2: "url2",
    3: "url3"
}
```
</details>

<details>
 <summary><code>GET</code> <code><b>/feed/&ltid&gt</b></code> <code>(Returns the list of RSS feeds)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `id`              |  required | string         | The id of the requested RSS feed    |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `404`         | `application/json`                | `{status: "Not found", msg: "Index out of range"}`                  |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |

##### Example

If the status code is `200`, the endpoint returns a JSON object that contains the URL of the requested RSS feed.

```json
{
    feed: "url"
}
```
</details>

<details>
 <summary><code>GET</code> <code><b>/fetch_feed/&ltid&gt</b></code> <code>(Return the news from the requested feed)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `id`              |  required | string         | The id of the requested RSS feed    |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `404`         | `application/json`                | `{status: "Not found", msg: "Index out of range"}`                  |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |

##### Example

If the status code is `200`, the endpoint returns a JSON object that contains the requested RSS feed.

```json
{
    feed_title: "FOX Sports Digital",
    entries: [
      link: "https://www.foxsports.com/stories/soccer/usmnt-january-transfer-window-tracker-2024"
      media_content: "https://www.foxsports.com/image.jpg"
      summary: "news summary"
      title: "news title"
    ]
}
```
</details>

#### News Text Extractor

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(check if the adapter is running)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | News Text Extractor Adapter is running                              |

</details>

<details>
 <summary><code>POST</code> <code><b>/searchNews</b></code> <code>(Makes a POST request to the text similarities API with the summaries of the news, and returns its response)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                                                |
> |-------------------|-----------|----------------|------------------------------------------------------------|
> | `news`            |  required | []             | Array of news from which the summaries is extracted        |
> | `word`            |  required | string         | Search criteria                                            |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | Text similiarities api is running                                   |

##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  texts: [
    "text1",
    "text2",
    ...
  ]
}
```

</details>

#### FOOTBALL Adapter

<details>
 <summary><code>GET</code> <code><b>/getLeagues</b></code> <code>(get all the leagues available for the current year)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`	 	             | JSON object, see Example                                            |
> | `400`         | `application/json` 		             | `{status: "error", msg: ".. error msg .. "}`                        |

##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  status: "success",
  leagues: [{
    league: {..league_info..},
    country: {..country_info..},
    season: [{..season_info}]
  },{
    league: {..league_info..},
    country: {..country_info..},
    season: [{..season_info}]
  }]
}
```
</details>

<details>
 <summary><code>GET</code> <code><b>/getTeams</b></code> <code>(Get information of all the teams in a League in the current season)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `leagueId`        |  required | string         | The league of the teams             |

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
  teams: [{
    team: {..team_info..},
    venue: {..venue_info..}
  },{
    team: {..team_info..},
    venue: {..venue_info..}
  }]
}
```

</details>

<details>

 <summary><code>GET</code> <code><b>/getTeamInfoById</b></code> <code>(Get information about a team for which only the leagueId and teamId are known)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `leagueId`        |  required | string         | The league of the team              |
> | `teamId`          |  required | string         | The teamId of the team              |

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
  teamInfo: {
    team: {..team_info..},
    venue: {..venue_info..}
  }
}
```

</details>

<details>

 <summary><code>POST</code> <code><b>/getFixtures</b></code> <code>(Get fixtures of the teams provided)</code></summary>

##### Parameters

> | name                  |  type     | data type      | description                            |
> |-----------------------|-----------|----------------|----------------------------------------|
> | `teamIds`             |  required | string         | The teamId of the teams                |
> | `numberOfNextMatches` |  required | string         | Number of the next matches wanted      |

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
  matches: [{
    fixture: {..fixture_info..},
    league: {..league_info..},
    teams: {..teams_info..},
    goals: {..goals_info..},
    score: {..score_info..}
  },{
   fixture: {..fixture_info..},
    league: {..league_info..},
    teams: {..teams_info..},
    goals: {..goals_info..},
    score: {..score_info..}
  }]
}
```

</details>

#### POSITIONSTACK Adapter

<details>
 <summary><code>GET</code> <code><b>/getCoordinates</b></code> <code>(Get the coordinates of a place)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                                      		      |
> |-------------------|-----------|----------------|----------------------------------------------------------|
> | `place`           |  required | string         | The place for which the coodinates are needed            |

##### Responses

> | http code     | content-type                      | response                                                     |
> |---------------|-----------------------------------|--------------------------------------------------------------|
> | `200`         | `application/json`	 	             | JSON object, see Example                                     |
> | `400`         | `application/json` 		             | `{status: "error", msg: ".. error msg .. "}`                 |

##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  status: "success",
  data:{
     "latitude": 38.897675,
     "longitude": -77.036547,
     "label": "1600 Pennsylvania Avenue NW, Washington, DC, USA",
     "name": "1600 Pennsylvania Avenue NW",
     "type": "address",
     "number": "1600",
     "street": "Pennsylvania Avenue NW",
     "postal_code": "20500",
     "confidence": 1,
     "region": "District of Columbia",
     "region_code": "DC",
     "administrative_area": null,
     "neighbourhood": "White House Grounds",
     "country": "United States",
     "country_code": "US"
  }
}
```
</details>

#### WEATHER Adapter

<details>
 <summary><code>GET</code> <code><b>/getWeather</b></code> <code>(Get forecast of a place for the next 16 days)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         		      |
> |-------------------|-----------|----------------|---------------------------------------------|
> | `lat`             |  required | string         | Latitude of the place			  	                 |
> | `lon`             |  required | string         | Longitude of the place			  	                |


##### Responses

> | http code     | content-type                      | response                                                     |
> |---------------|-----------------------------------|--------------------------------------------------------------|
> | `200`         | `application/json`	 	             | JSON object, see Example                                     |
> | `400`         | `application/json` 		             | `{status: "error", msg: ".. error msg .. "}`                 |

##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  status: "success",
  data:{
     app_max_temp:-2.1
     app_min_temp:-10
     clouds:44
     clouds_hi:0
     ...

     ...
     weather: {
       description:"Broken clouds",
       weather_info
    }
  }
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

#### News Aggregator

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(check if the service is running)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | News Aggregator business logic is running                           |

</details>


<details>
 <summary><code>GET</code> <code><b>/news</b></code> <code>(Get all the news from the different rss feeds)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |

##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
 [
    {
      feed_title: "FOX Sports Digital",
      entries: [
        link: "https://www.foxsports.com/stories/soccer/usmnt-january-transfer-window-tracker-2024"
        media_content: "https://www.foxsports.com/image.jpg"
        summary: "news summary"
        title: "news title"
      ]
    },
    {
      feed_title: "BBC news"
      entries: [
        ...
      ]
    }
    ,
    ...
  ]
}
```

</details>

#### Article Extractor

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(check if the service is running)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | Article Extractor business logic is running                         |

</details>


<details>
 <summary><code>GET</code> <code><b>/article</b></code> <code>(Get the news elements (title, text, image) from the html text)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `url`             |  required | string         | The article's url                   |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |
> | `500`         | `application/json`                | `{status: "Internal error", msg: ".. error msg .. "}`                        |

##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  title: "article title",
  text: "article text",
  image: "image's url"
}
```

</details>

#### FOOTBALL

<details>
 <summary><code>GET</code> <code><b>/getLeaguesAvailable</b></code> <code>(Get leagues available on the service)</code></summary>

##### Parameters

> none

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
  leagues:[{
    id:61
    name:"Ligue 1"
    type:"League"
    logo:"https://media.api-sports.io/football/leagues/61.png"
   },{
    id:62
    name:"Ligue X"
    type:"League"
    logo:"https://media.api-sports.io/football/leagues/62.png" 
   }]
}
```
</details>

<details>
 <summary><code>GET</code> <code><b>/getTeams</b></code> <code>(Get all the teams in a League)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `leagueId`        |  required | string         | The league of the teams             |

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
  teams: [{
    {..team_info..},
    {..team_info..},
    {..team_info..}
  }]
}
```

</details>

<details>
 <summary><code>GET</code> <code><b>/getTeamInfo</b></code> <code>(Get information about a team and filter only a possible response)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `leagueId`        |  required | string         | The league of the team              |
> | `teamId`          |  required | string         | The teamId of the team              |

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
  teamInfo: {
    team: {..team_info..},
    venue: {..venue_info..}
  }
}
```
</details>

<details>

 <summary><code>POST</code> <code><b>/getFixtures</b></code> <code>(Get fixtures of the teams provided with filtered infos)</code></summary>

##### Parameters

> | name                  |  type     | data type      | description                            |
> |-----------------------|-----------|----------------|----------------------------------------|
> | `teamIds`             |  required | string         | The teamId of the teams                |
> | `numberOfNextMatches` |  required | string         | Number of the next matches wanted      |

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
  matches: [{
    "matchReferee": "Referee1",
    "matchDate": "2024-01-04",
    "stadium": "Stadium1",
    "city": "City1",
    "league": "League1",
    "country": "Country1",
    "homeTeam": "HomeTeam1",
    "homeTeamLogoLink": "HomeTeam1LogoLink",
    "awayTeam": "AwayTeam1",
    "awayTeamLogoLink": "AwayTeam1LogoLink"
  },
  {
    "matchReferee": "Referee2",
    "matchDate": "2024-01-05",
    "stadium": "Stadium2",
    "city": "City2",
    "league": "League2",
    "country": "Country2",
    "homeTeam": "HomeTeam2",
    "homeTeamLogoLink": "HomeTeam2LogoLink",
    "awayTeam": "AwayTeam2",
    "awayTeamLogoLink": "AwayTeam2LogoLink"
  }]

}
```

</details>

##### Place forecast

<details>
 <summary><code>GET</code> <code><b>/getTeams</b></code> <code>(Get the weather for a place (stadium) on a specific date)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `stadium`         |  required | string         | The league of the teams             |
> | `matchDate`       |  required | string         | The league of the teams             |

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
  weather: {
    "min_temp": 15,
    "max_temp": 25,
    "description": 'Clear sky' || 'data still not computed'
  }
}
```

</details>

------------------------------------------------------------------------------------------
## Process centric


#### Authentication


<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(check if the service is running)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | Authentication process centric service is running                   |

</details>


<details>
 <summary><code>POST</code> <code><b>/login</b></code> <code>(Normal user login with email and password)</code></summary>

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


<details>
 <summary><code>POST</code> <code><b>/registration</b></code> <code>(Normal user registration, with the DB)</code></summary>

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
  msg: "User registered"
}
```

</details>


<details>
 <summary><code>GET</code> <code><b>/google/authenticate</b></code> <code>(User login using Google OAuth)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `302`         | `text/html`                       | Redirects to Google OAuth authentication endpoint, then redirects to `/google/callback` |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |


</details>


<details>
 <summary><code>GET</code> <code><b>/google/callback</b></code> <code>(Callback endpoint called by Google after login)</code></summary>

##### Parameters

> None

The parameters are filled by Google after successfully authenticating.

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `302`         | `text/html`                       | Redirects to `/` if an error occurred during the authentication     |



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

<details>
 <summary><code>GET</code> <code><b>/google/logout</b></code> <code>(Destroys the Google session)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |



##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  status: "success"
}
```

</details>


<details>
 <summary><code>GET</code> <code><b>/isAuthenticated</b></code> <code>(Checks if a user is authenticated)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `token`           |  required | string         | The JWT token                       |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |



##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  "status": "success",
  "authenticated": true,
  "data": {
    "id": 6,
    "email": "prova1@gmail.com",
    "iat": 1705003554
  }
}
```

</details>

#### Football news
<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(check if the service is running)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | Football news process centric service is running                   |

</details>


<details>
 <summary><code>GET</code> <code><b>/news</b></code> <code>(Get all the news or search for some of them)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `search`          |  optional | string         | News search criteria                |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |

##### Example
If the status code is `200` and the search parameter is empty, all the news will be returned. Otherwise, the service will respond with the 
10 news most similar to the search criteria.

In the first case the returned json will be as follow:
```json
[
  {
    link:,
    summary:,
    title:
  },
  {
    link:,
    summary:,
    title:
  },
  {
    ...
  }
]
```

Otherwise, when all the news are returned, it will be like this:\

```json
{
  [
    {
      feed_title: "FOX Sports Digital",
      entries: [
        link: "https://www.foxsports.com/stories/soccer/usmnt-january-transfer-window-tracker-2024"
        media_content: "https://www.foxsports.com/image.jpg"
        summary: "news summary"
        title: "news title"
      ]
    },
    {
      feed_title: "BBC news"
      entries: [
        ...
      ]
    }
    ,
    ...
  ]
}
```

</details>


<details>
 <summary><code>GET</code> <code><b>/news/article</b></code> <code>(Send a request to the article extractor to get the HTML text corresponding to an article)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `url`             |  required | string         | The article's url                     |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |

##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  title: "article title",
  text: "article text",
  image: "image's url"
}
```

</details>

#### Football Matches

<details>
 <summary><code>GET</code> <code><b>/userTeamsOfInterest</b></code> <code>(Get all the the teams of interests of the user)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `token`           |  required | string         | Token containing the user ID        |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |
> | `401`         | `application/json` 		             | `{status: "error", problem: "token not provided"}`                  |    
##### Example
If the status code is `200` and the search parameter is empty, all the news will be returned. Otherwise, the service will respond with the 
10 news most similar to the search criteria.

In the first case the returned json will be as follow:

```json
{
  status: "success",
  result:[{
    userId:1,
    teamId:2,
    leagueId:3
   },{
    userId:1,
    teamId:4,
    leagueId:5
   }]
  }
}
```

</details>

<details>
 <summary><code>POST</code> <code><b>/addTeamOfInterest</b></code> <code>(Add a new team to the interests of the user)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `token`           |  required | string         | Token containing the user ID        |
> | `teamId`          |  required | string         | The team ID                         |
> | `leagueId`        |  required | string         | The league ID of the team           |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | `{status: "success", msg: "team added"}`                            |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |
> | `401`         | `application/json` 		             | `{status: "error", problem: "token not provided"}`                  |      
</details>

<details>
 <summary><code>POST</code> <code><b>/removeTeamOfInterest</b></code> <code>(Remove a team from the interests of the user)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `token`           |  required | string         | Token containing the user ID        |
> | `teamId`          |  required | string         | The team ID                         |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | `{status: "success", msg: "team deleted"}`                          |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |
> | `401`         | `application/json` 		             | `{status: "error", problem: "token not provided"}`                  |

</details>

<details>
 <summary><code>GET</code> <code><b>/getLeaguesAvailable</b></code> <code>(Get leagues available on the service)</code></summary>

##### Parameters

> none

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
  leagues:[{
    id:61
    name:"Ligue 1"
    type:"League"
    logo:"https://media.api-sports.io/football/leagues/61.png"
   },{
    id:62
    name:"Ligue X"
    type:"League"
    logo:"https://media.api-sports.io/football/leagues/62.png" 
   }]
}
```
</details>


<details>
 <summary><code>GET</code> <code><b>/getTeamsByLeagueId</b></code> <code>(Get all the teams in a League)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `leagueId`        |  required | string         | The league of the teams             |

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
  teams: [{
    {..team_info..},
    {..team_info..},
    {..team_info..}
  }]
}
```

</details>
<details>

  <summary><code>GET</code> <code><b>/getTeamInfoById</b></code> <code>(Get information about a team and filter only a possible response)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `leagueId`        |  required | string         | The league of the team              |
> | `teamId`          |  required | string         | The teamId of the team              |

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
  teamInfo: {
    team: {..team_info..},
    venue: {..venue_info..}
  }
}
```
</details>

<details>

 <summary><code>POST</code> <code><b>/getMatchesOfInterest</b></code> <code>(Get fixtures of the teams provided with filtered infos)</code></summary>

##### Parameters

> | name                  |  type     | data type      | description                            |
> |-----------------------|-----------|----------------|----------------------------------------|
> | `token  `             |  required | string         | Token containing the user ID           |
> | `numberOfNextMatches` |  required | string         | Number of the next matches wanted      |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | JSON object, see Example                                            |
> | `400`         | `application/json`                | `{status: "error", msg: ".. error msg .. "}`                        |
> | `401`         | `application/json`                | `{status: "error", problem: "token not provided"}`                  |

##### Example
If the status code is `200`, the endpoint returns a JSON object adhering to the following syntax.

```json
{
  status: "success",
  matches: [{
    "matchReferee": "Referee1",
    "matchDate": "2024-01-04",
    "stadium": "Stadium1",
    "city": "City1",
    "league": "League1",
    "country": "Country1",
    "homeTeam": "HomeTeam1",
    "homeTeamLogoLink": "HomeTeam1LogoLink",
    "awayTeam": "AwayTeam1",
    "awayTeamLogoLink": "AwayTeam1LogoLink"
  },
  {
    "matchReferee": "Referee2",
    "matchDate": "2024-01-05",
    "stadium": "Stadium2",
    "city": "City2",
    "league": "League2",
    "country": "Country2",
    "homeTeam": "HomeTeam2",
    "homeTeamLogoLink": "HomeTeam2LogoLink",
    "awayTeam": "AwayTeam2",
    "awayTeamLogoLink": "AwayTeam2LogoLink"
  }]

}
```

</details>
