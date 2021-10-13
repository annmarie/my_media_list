import apiPageHandler from 'middleware/api-page-handler';

const payload = [
  {
    name: 'Sally Silly Stuff',
    price: 2.5,
    frequency: 'monthly',
    description: 'podcast',
    created_at: '20170412',
    updated_at: '20170412'
  },
  {
    name: "Tony's Thoughts and Poems",
    price: 2.5,
    frequency: 'monthly',
    description: 'podcast',
    created_at: '20140312',
    updated_at: '20170412'
  },
  {
    name: 'Classic Cinema',
    price: 2.5,
    frequency: 'annually',
    description: 'streaming',
    created_at: '20180312',
    updated_at: '20190822'
  },
  {
    name: 'Words with Enemies',
    price: 2.5,
    frequency: 'annually',
    description: 'application',
    created_at: '20161112',
    updated_at: '20190822'
  }
];

async function requestHandler(_req, res) {
  res.status(200).json({ payload });
}

export default apiPageHandler(requestHandler);
