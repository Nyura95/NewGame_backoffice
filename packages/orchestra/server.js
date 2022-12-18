/* eslint-disable @typescript-eslint/no-var-requires */
const bodyParser = require('body-parser'),
  cors = require('cors'),
  express = require('express'),
  accessToken = 'realaccesstoken',
  refreshToken = 'realrefreshtoken'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

const COLOR = ['black', 'blue', 'purple', 'orange']
const FLEET = ['prod', 'preprod', 'réparation']
const TOPCASE = ['avec top-case', 'sans top-case']
const STATERESA = ['Libre', 'En réservation', 'En pause']
const SYNC = [0, 1]
const EPSTATE = ['EP VIDE', 'EP NON VIDE']
const EPPRESENT = ['EP Présent', 'EP non présent']
const VSCOOTER = ['v4', 'v5']

const getScooter = index => {
  const position = getRandomPosition(
    { min: 48.83232, max: 48.88292 },
    { min: 2.29936, max: 2.38801 },
    7,
  )

  return {
    state: COLOR[getRandomInt(COLOR.length - 1)],
    name: 'scoot ' + index,
    citybox: '28683607' + index,
    plate: 'FC-916-LQ',
    fleet: FLEET[getRandomInt(FLEET.length - 1)],
    date_change_fleet: new Date(),
    date_sync: new Date(),
    is_sync: SYNC[getRandomInt(SYNC.length - 1)],
    autonomy: getRandomInt(35),
    has_top_case: TOPCASE[getRandomInt(TOPCASE.length - 1)],
    state_resa: STATERESA[getRandomInt(STATERESA.length - 1)],
    ep_state: EPSTATE[getRandomInt(EPSTATE.length - 1)],
    ep_inside: EPPRESENT[getRandomInt(EPPRESENT.length - 1)],
    adresse: '8 rue bayen, 75011 Paris',
    scooter_version: VSCOOTER[getRandomInt(VSCOOTER.length - 1)],
    bat_version: 0.39,
    latitude: position[0],
    longitude: position[1],
  }
}

const getScooterMap = index => {
  const position = getRandomPosition(
    { min: 48.83232, max: 48.88292 },
    { min: 2.29936, max: 2.38801 },
    7,
  )

  return {
    state: COLOR[getRandomInt(COLOR.length - 1)],
    name: 'scoot ' + index,
    autonomy: getRandomInt(35),
    latitude: position[0],
    longitude: position[1],
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function getRandomPosition(latitude, longitude, decimals) {
  const lat = (Math.random() * (latitude.max - latitude.min) + latitude.min).toFixed(decimals)
  const long = (Math.random() * (longitude.max - longitude.min) + longitude.min).toFixed(decimals)

  return [parseFloat(lat), parseFloat(long)]
}

function reverseCoordinateZone(coordinates) {
  for (let i = 0; i < coordinates.length; i++) {
    const tmp = coordinates[i][0]
    coordinates[i][0] = coordinates[i][1]
    coordinates[i][1] = tmp
  }

  return coordinates
}

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const tokenRequired = (req, res, next) => {
  console.log(req.headers.authorization)
  if (req.headers.authorization !== `Bearer ${accessToken}`) {
    return res.status(401).json(basicErrorMessage('nok', 'ERROR_AUTH'))
  }
  next()
}

// post request login refresh
app.post('/login/refresh', (req, res) => {
  const { refresh_token } = req.body

  if (refresh_token !== refreshToken) {
    return res.status(400).json(basicErrorMessage('nok', 'ERROR_AUTH'))
  }

  return res.json(basicMessage({ accessToken, refreshToken }))
})

// post request login
app.post('/login', async (req, res) => {
  const { token } = req.body

  if (token === '') {
    return res.status(400).json(basicErrorMessage('nok', 'LOGIN_ERROR'))
  }

  await timeout(2000)

  return res.json(basicMessage({ accessToken, refreshToken }))
})

app.post('/scooters', tokenRequired, async (req, res) => {
  console.log(req.body)
  const scooters = []
  for (let i = 0; i < 500; i++) {
    scooters.push(getScooter(i))
  }

  await timeout(2000)

  return res.json(basicMessage(scooters))
})

app.get('/map/scooters', tokenRequired, async (req, res) => {
  const scooters = []
  for (let i = 0; i < 500; i++) {
    scooters.push(getScooterMap(i))
  }

  const zones = [
    {
      name: 'PARIS_Zone_service_ILE_CITE',
      coordinates: reverseCoordinateZone([
        [48.8567891, 2.3412385],
        [48.855154, 2.3431148],
        [48.8548142, 2.3437022],
        [48.8541833, 2.3451519],
        [48.8534571, 2.3471247],
        [48.8527785, 2.3486173],
        [48.8522773, 2.3498511],
        [48.8518184, 2.3516965],
        [48.8527573, 2.352308],
        [48.8532427, 2.3522222],
        [48.8536715, 2.3520787],
        [48.8540024, 2.3519017],
        [48.8545689, 2.3513411],
        [48.8549201, 2.3507886],
        [48.8551911, 2.350171],
        [48.8554126, 2.3496071],
        [48.8556896, 2.3485315],
        [48.8559834, 2.3474801],
        [48.8563293, 2.3463213],
        [48.8566276, 2.3454121],
        [48.8567387, 2.3449467],
        [48.8569152, 2.3440146],
        [48.8569999, 2.3432703],
        [48.8571667, 2.3417241],
        [48.8570961, 2.3415389],
        [48.8567891, 2.3412385],
      ]),
    },
  ]

  // await timeout(2000)

  return res.json(basicMessage({ scooters, zones }))
})

app.post('/scooters/command', async (req, res) => {
  console.log(req.body)

  await timeout(2000)

  return res.json(basicMessage('ok'))
})

app.get('/scooters/:id', async (req, res) => {
  console.log(req.params.id)

  await timeout(2000)

  const date_sync = new Date()
  if (getRandomInt(2) === 1) {
    date_sync.setDate(new Date().getDate() - 1)
  }

  return res.json(
    basicMessage({
      citybox: req.params.id,
      name: 'scooter ex',
      date_sync: date_sync.toISOString(),
    }),
  )
})

const server = app.listen(3001, function () {
  console.log('Listening on port ' + server.address().port)
})

const basicMessage = data => ({
  comment: 'ok',
  data,
  hash: '9934594953434',
  i18nComment: 'ok',
  reason: 1,
  serverTime: new Date(),
  status: 200,
  success: true,
  version: '1.0',
})

const basicErrorMessage = (data, error) => ({
  comment: 'nok',
  data,
  hash: '9934594953434',
  i18nComment: error,
  reason: 1,
  serverTime: new Date(),
  status: 400,
  success: false,
  version: '1.0',
})
