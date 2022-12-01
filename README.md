# VPatientAPI
API of Virtual Patient based on Express Node.js web application framework and MongoDB. Includes CI/CD integration powered by GitHub Self-Hosted Runners.

## How to run
You can run the project as follows:

1. Fork or clone the repository to your local. You can use the command below:
```
git clone https://github.com/VPatient/VPatientAPI
```

2. Open any kind of terminal in the directory of the API:
```
cd VPatientAPI # assuming that you are currently out of the folder of the API
npm install # to install required libraries/packages
```

3. In order to run project you are going to need a '.env' file which will be located in the folder of the API.
> rename 'example.env' to '.env'
> fill all variables in the given format
```
MONGO_DB_URL= # mongodb connect url
PORT=5000 # port that is going to be used
SECRET=ef28ed74551a40deba54b81df485c83a # password hashing secret
AUTH_SECRET=ef28ed74551a40deba54b81df485c83b # authorizing secret -> to get a user to be an authorized via auth/authorized route
GRADE_SECRET=ef28ed74551a40deba54b81df485c83c # grade secret -> to use grade/create route and save one grade to user
```

4. You have to run:
```
npm start
```

After all these steps your API should be running on http://localhost:5000
