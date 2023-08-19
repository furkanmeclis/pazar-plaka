const fs = require('fs');
const records = require('/db.json');
const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: 'https://skilled-muskox-31954.upstash.io',
  token:
    'AXzSASQgMzk4ZWU5ZWMtNDY0NC00ZmRmLTllNmUtMDFjOTY2MTYzNDAyZGJkNWYyMWY3N2Y1NGJmMTgyNGNjZjQxMmVjNDMyZmM=',
});

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Sadece POST methodu desteklenmektedir.' });
    return;
  }
  const plaka = JSON.parse(req.body).plaka;
  let sorgu = await redis.get(plaka);
  console.log(sorgu);
  if (sorgu === null) {
    await redis.set(plaka, plaka);
    res.status(200).send({ message: 'Yeni Araç', isnew: true });
  } else {
    res.status(200).send({ message: 'Araç Giriş Kaydı Bulundu', isnew: false });
  }
};
