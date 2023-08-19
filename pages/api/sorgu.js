const fs = require('fs');
const records = require('/db.json');

const findPlaka = async (plaka) => {
  let sorgu = false;
  await Promise.all(
    Object.entries(records).map(([key, value]) => {
      if (key === plaka) {
        sorgu = value;
      }
    })
  );
  return sorgu;
};
export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Sadece POST methodu desteklenmektedir.' });
    return;
  }
  const plaka = JSON.parse(req.body).plaka;
  let sorgu = await findPlaka(plaka);
  if (sorgu === false) {
    fs.writeFileSync(
      'db.json',
      JSON.stringify({ ...records, [plaka]: plaka }, null, 4)
    );
    res.status(200).send({ message: 'Yeni Araç', isnew: true });
  } else {
    res.status(200).send({ message: 'Araç Giriş Kaydı Bulundu', isnew: false });
  }
};
