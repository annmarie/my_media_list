import apiPageHandler from 'middleware/api-page-handler';
import { v4 as uuidv4 } from 'uuid';

const payload = [
  {
    id: uuidv4(),
    name: "Sally's Silly Stuff",
    price: 8.88,
    frequency: 'monthly',
    description: 'Podcast',
    created_at: 1492024638000,
    updated_at: 16344996701530
  },
  {
    id: uuidv4(),
    name: "Tony's Thoughts and Poems",
    price: 2.5,
    frequency: 'monthly',
    description: 'Podcast',
    created_at: 1634499670153,
    updated_at: 14053435300000
  },
  {
    id: uuidv4(),
    name: 'Classic Cinema',
    price: 75.95,
    frequency: 'yearly',
    description: 'Streaming',
    created_at: 13946299300000,
    updated_at: 15315741090001
  },
  {
    id: uuidv4(),
    name: 'Words with Enemies',
    price: 74,
    frequency: 'yearly',
    description: 'Application',
    created_at: 13946299300000,
    updated_at: 14896736520002
  },
  {
    id: uuidv4(),
    name: 'Philo',
    price: 20,
    frequency: 'monthly',
    description: 'Streaming',
    created_at: 15208605090001,
    updated_at: 15823630960003
  },
  {
    id: uuidv4(),
    name: 'Criterion Channel',
    price: 99,
    frequency: 'yearly',
    description: 'Streaming',
    created_at: 14789600520002,
    updated_at: 15851242340004
  },
  {
    id: uuidv4(),
    name: 'Penguin Projectiles',
    price: 9.99,
    frequency: 'monthly',
    description: '',
    created_at: 15716494960003,
    updated_at: 15878174020005
  },
  {
    id: uuidv4(),
    name: 'Art Haus',
    price: 68,
    frequency: 'yearly',
    description: 'Streaming',
    created_at: 15744106340004,
    updated_at: 15853185160006
  },
  {
    id: uuidv4(),
    name: 'Downhill',
    price: 9.95,
    frequency: 'monthly',
    description: '',
    created_at: 15771038020005,
    updated_at: 15591463940007
  },
  {
    id: uuidv4(),
    name: 'Nod-ible Sounds to Sleep',
    price: 14.95,
    frequency: 'monthly',
    description: 'Streaming',
    created_at: 15746049160006,
    updated_at: 15618142380008
  },
  {
    id: uuidv4(),
    name: 'History Mysteries',
    price: 45,
    frequency: 'yearly',
    description: 'Podcast',
    created_at: 15484327940007,
    updated_at: 15644028800009
  },
  {
    id: uuidv4(),
    name: 'Try for Pi',
    price: 37,
    frequency: 'yearly',
    description: 'Podcast',
    created_at: 15511006380008,
    updated_at: 15671781160010
  },
  {
    id: uuidv4(),
    name: 'Nuanced',
    price: 7.5,
    frequency: 'monthly',
    description: 'Newsletter',
    created_at: 15564645160010,
    updated_at: 15726067220012
  },
  {
    id: uuidv4(),
    name: 'Restless Rutherford',
    price: 8.99,
    frequency: 'monthly',
    description: 'Streaming',
    created_at: 15591139950011,
    updated_at: 15752759120013
  },
  {
    id: uuidv4(),
    name: 'Subslack',
    price: 3,
    frequency: 'monthly',
    description: 'Newsletter',
    created_at: 15618931220012,
    updated_at: 15759783080014
  },
  {
    id: uuidv4(),
    name: 'Greater Good Science Center',
    price: 2,
    frequency: 'monthly',
    description: 'Newsletter',
    created_at: 15645623120013,
    updated_at: 15788490090015
  },
  {
    id: uuidv4(),
    name: 'Mind over Matter',
    price: 6.3,
    frequency: 'monthly',
    description: 'Podcast',
    created_at: 15652647080014,
    updated_at: 15816205300016
  },
  {
    id: uuidv4(),
    name: 'Dad like me',
    price: 5.5,
    frequency: 'monthly',
    description: 'Podcast',
    created_at: 15681354090015,
    updated_at: 15846466760017
  },
  {
    id: uuidv4(),
    name: 'Terroir',
    price: 4.75,
    frequency: 'monthly',
    description: 'Streaming',
    created_at: 15709069300016,
    updated_at: 15867725720018
  },
  {
    id: uuidv4(),
    name: 'Water tower',
    price: 3.45,
    frequency: 'monthly',
    description: 'Newsletter',
    created_at: 15739330760017,
    updated_at: 16140089830019
  },
  {
    id: uuidv4(),
    name: 'Evidence',
    price: 9.95,
    frequency: 'monthly',
    description: 'Streaming',
    created_at: 15760589720018,
    updated_at: 16167838540020
  },
  {
    id: uuidv4(),
    name: 'Pros and Cons',
    price: 7.75,
    frequency: 'monthly',
    description: '',
    created_at: 16032953830019,
    updated_at: 16194577320021
  },
  {
    id: uuidv4(),
    name: 'Planet Plants Plate',
    price: 4.55,
    frequency: 'monthly',
    description: 'Newsletter',
    created_at: 16060702540020,
    updated_at: 15886113220022
  },
  {
    id: uuidv4(),
    name: 'Free to be',
    price: 5.65,
    frequency: 'monthly',
    description: '',
    created_at: 16087441320021,
    updated_at: 15912806750023
  },
  {
    id: uuidv4(),
    name: 'Ambivelent Angst',
    price: 4,
    frequency: 'monthly',
    description: '',
    created_at: 15778977220022,
    updated_at: 15937859600024
  },
  {
    id: uuidv4(),
    name: 'Wag along with Jon',
    price: 3.4,
    frequency: 'monthly',
    description: '',
    created_at: 15805670750023,
    updated_at: 15971645560025
  },
  {
    id: uuidv4(),
    name: 'Pop for the planet',
    price: 2.65,
    frequency: 'monthly',
    description: '',
    created_at: 15830723600024,
    updated_at: 15998347990026
  },
  {
    id: uuidv4(),
    name: 'ICYMI',
    price: 2.3,
    frequency: 'monthly',
    description: '',
    created_at: 15864509560025,
    updated_at: 16026070310027
  },
  {
    id: uuidv4(),
    name: 'Crypto Commons',
    price: 6.75,
    frequency: 'monthly',
    description: 'Podcast',
    created_at: 15918934310027,
    updated_at: 16080276730029
  },
  {
    id: uuidv4(),
    name: 'Compound Interest',
    price: 4.75,
    frequency: 'monthly',
    description: 'Newsletter',
    created_at: 15945537720028,
    updated_at: 16107991300030
  },
  {
    id: uuidv4(),
    name: 'Blind Justice',
    price: 5.6,
    frequency: 'monthly',
    description: 'Podcast',
    created_at: 15973140730029,
    updated_at: 16134805330031
  },
  {
    id: uuidv4(),
    name: '20Percent',
    price: 3,
    frequency: 'monthly',
    description: 'Newsletter',
    created_at: 16000855300030,
    updated_at: 15898792960032
  },
  {
    id: uuidv4(),
    name: 'Plausible Deniability',
    price: 6.95,
    frequency: 'monthly',
    description: 'Streaming',
    created_at: 16027669330031,
    updated_at: 16189207370033
  },
  {
    id: uuidv4(),
    name: 'Crumb coat',
    price: 2.3,
    frequency: 'monthly',
    description: '',
    created_at: 15791656960032,
    updated_at: 15927521500034
  }
];

async function requestHandler(_req, res) {
  res.status(200).json({ payload });
}

export default apiPageHandler(requestHandler);
