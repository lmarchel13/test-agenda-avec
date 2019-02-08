//
const axios = require('axios');

const mockAgendaData = async (endpoint, id) => {
  const res = await axios.post(endpoint, {
    id: id,
    datahora: new Date(),
    id_customer: randomNum(0, 1000),
    id_pro: randomNum(0, 1000),
    id_service: randomNum(0, 1000),
  });
};

const randomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const endpoint = 'http://localhost:4000/agenda';

const size = 300;
let i = 0;
while (i < size) {
  mockAgendaData(endpoint, i);
  i++;
}
