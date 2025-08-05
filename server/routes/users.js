import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const prisma = req.app.get('prisma');
  const {
    sub: faydaId,
    name,
    email,
    phone_number,
    nationality,
    gender,
    birthdate,
    picture,
    address,
  } = req.body;

  try {
    const user = await prisma.user.upsert({
      where: { faydaId },
      update: {
        name,
        email,
        phoneNumber: phone_number,
        nationality,
        gender,
        birthdate,
        picture,
        region: address?.region,
        zone: address?.zone,
        woreda: address?.woreda,
        
      },
      create: {
        faydaId,
        name,
        email,
        phoneNumber: phone_number,
        nationality,
        gender,
        birthdate,
        picture,
        region: address?.region,
        zone: address?.zone,
        woreda: address?.woreda,
        role: 'CITIZEN',  
      },
    });

    res.json(user);
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

export default router;
