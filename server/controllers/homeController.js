const index = (req, res) => {
  res.render('index', {
    title: 'WebApp PWPCII IE',
  });
};
const greeting = (req, res) => {
  res.status(200).json({ message: 'Estas creando un saludo para PWPCII' });
};

export default {
  index,
  greeting,
};
