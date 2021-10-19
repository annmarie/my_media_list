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
    updated_at: 1634499670153
  },
  {
    id: uuidv4(),
    name: "Tony's Thoughts and Poems",
    price: 2.5,
    frequency: 'monthly',
    description: 'Podcast',
    created_at: 1634499670153,
    updated_at: 1405343530000
  },
  {
    id: uuidv4(),
    name: 'Classic Cinema',
    price: 75.95,
    frequency: 'yearly',
    description: 'Streaming',
    created_at: 1394629930000,
    updated_at: 1531574109000
  },
  {
    id: uuidv4(),
    name: 'Words with Enemies',
    price: 74,
    frequency: 'yearly',
    description: 'Application',
    created_at: 1394629930000,
    updated_at: 1489673652000
  },
  {
    id: uuidv4(),
    name: 'Philo',
    price: 20,
    frequency: 'monthly',
    description: 'Streaming',
    created_at: 1520860509000,
    updated_at: 1582363096000
  },
  {
    id: uuidv4(),
    name: 'Criterion Channel',
    price: 99,
    frequency: 'yearly',
    description: 'Streaming',
    created_at: 1478960052000,
    updated_at: 1585124234000
  },
  {
    id: uuidv4(),
    name: 'Penguin Projectiles',
    price: 9.99,
    frequency: 'monthly',
    description: '',
    created_at: 1571649496000,
    updated_at: 1587817402000
  },
  {
    id: uuidv4(),
    name: 'Art Haus',
    price: 68,
    frequency: 'yearly',
    description: 'Streaming',
    created_at: 1574410634000,
    updated_at: 1585318516000
  },
  {
    id: uuidv4(),
    name: 'Downhill',
    price: 9.95,
    frequency: 'monthly',
    description: '',
    created_at: 1577103802000,
    updated_at: 1559146394000
  },
  {
    id: uuidv4(),
    name: 'Nod-ible Sounds to Sleep',
    price: 14.95,
    frequency: 'monthly',
    description: 'Streaming',
    created_at: 1574604916000,
    updated_at: 1561814238000
  },
  {
    id: uuidv4(),
    name: 'History Mysteries',
    price: 45,
    frequency: 'yearly',
    description: 'Podcast',
    created_at: 1548432794000,
    updated_at: 1564402880000
  },
  {
    id: uuidv4(),
    name: 'Try for Pi',
    price: 37,
    frequency: 'yearly',
    description: 'Podcast',
    created_at: 1551100638000,
    updated_at: 1567178116001
  },
  {
    id: uuidv4(),
    name: 'Nuanced',
    price: 7.5,
    frequency: 'monthly',
    description: 'Newsletter',
    created_at: 1556464516001,
    updated_at: 1572606722001
  },
  {
    id: uuidv4(),
    name: 'Restless Rutherford',
    price: 8.99,
    frequency: 'monthly',
    description: 'Streaming',
    created_at: 1559113995001,
    updated_at: 1575275912001
  },
  {
    id: uuidv4(),
    name: 'Subslack',
    price: 3,
    frequency: 'monthly',
    description: 'Newsletter',
    created_at: 1561893122001,
    updated_at: 1575978308001
  },
  {
    id: uuidv4(),
    name: 'Greater Good Science Center',
    price: 2,
    frequency: 'monthly',
    description: 'Newsletter',
    created_at: 1564562312001,
    updated_at: 1578849009001
  },
  {
    id: uuidv4(),
    name: 'Mind over Matter',
    price: 6.3,
    frequency: 'monthly',
    description: 'Podcast',
    created_at: 1565264708001,
    updated_at: 1581620530001
  },
  {
    id: uuidv4(),
    name: 'Dad like me',
    price: 5.5,
    frequency: 'monthly',
    description: 'Podcast',
    created_at: 1568135409001,
    updated_at: 1584646676001
  },
  {
    id: uuidv4(),
    name: 'Terroir',
    price: 4.75,
    frequency: 'monthly',
    description: 'Streaming',
    created_at: 1570906930001,
    updated_at: 1586772572001
  },
  {
    id: uuidv4(),
    name: 'Water tower',
    price: 3.45,
    frequency: 'monthly',
    description: 'Newsletter',
    created_at: 1573933076001,
    updated_at: 1614008983001
  },
  {
    id: uuidv4(),
    name: 'Evidence',
    price: 9.95,
    frequency: 'monthly',
    description: 'Streaming',
    created_at: 1576058972001,
    updated_at: 1616783854002
  },
  {
    id: uuidv4(),
    name: 'Pros and Cons',
    price: 7.75,
    frequency: 'monthly',
    description: '',
    created_at: 1603295383001,
    updated_at: 1619457732002
  },
  {
    id: uuidv4(),
    name: 'Planet Plants Plate',
    price: 4.55,
    frequency: 'monthly',
    description: 'Newsletter',
    created_at: 1606070254002,
    updated_at: 1588611322002
  },
  {
    id: uuidv4(),
    name: 'Free to be',
    price: 5.65,
    frequency: 'monthly',
    description: '',
    created_at: 1608744132002,
    updated_at: 1591280675002
  },
  {
    id: uuidv4(),
    name: 'Ambivelent Angst',
    price: 4,
    frequency: 'monthly',
    description: '',
    created_at: 1577897722002,
    updated_at: 1593785960002
  },
  {
    id: uuidv4(),
    name: 'Wag along with Jon',
    price: 3.4,
    frequency: 'monthly',
    description: '',
    created_at: 1580567075002,
    updated_at: 1597164556002
  },
  {
    id: uuidv4(),
    name: 'Pop for the planet',
    price: 2.65,
    frequency: 'monthly',
    description: '',
    created_at: 1583072360002,
    updated_at: 1599834799002
  },
  {
    id: uuidv4(),
    name: 'ICYMI',
    price: 2.3,
    frequency: 'monthly',
    description: '',
    created_at: 1586450956002,
    updated_at: 1602607031002
  },
  {
    id: uuidv4(),
    name: 'Crypto Commons',
    price: 6.75,
    frequency: 'monthly',
    description: 'Podcast',
    created_at: 1591893431002,
    updated_at: 1608027673002
  },
  {
    id: uuidv4(),
    name: 'Compound Interest',
    price: 4.75,
    frequency: 'monthly',
    description: 'Newsletter',
    created_at: 1594553772002,
    updated_at: 1610799130003
  },
  {
    id: uuidv4(),
    name: 'Blind Justice',
    price: 5.6,
    frequency: 'monthly',
    description: 'Podcast',
    created_at: 1597314073002,
    updated_at: 1613480533003
  },
  {
    id: uuidv4(),
    name: '20Percent',
    price: 3,
    frequency: 'monthly',
    description: 'Newsletter',
    created_at: 1600085530003,
    updated_at: 1589879296003
  },
  {
    id: uuidv4(),
    name: 'Plausible Deniability',
    price: 6.95,
    frequency: 'monthly',
    description: 'Streaming',
    created_at: 1502766933003,
    updated_at: 1518920737003
  },
  {
    id: uuidv4(),
    name: 'Crumb coat',
    price: 2.3,
    frequency: 'monthly',
    description: '',
    created_at: 1379165696003,
    updated_at: 1392752150003
  }
];

async function requestHandler(_req, res) {
  res.status(200).json({ payload });
}

export default apiPageHandler(requestHandler);
