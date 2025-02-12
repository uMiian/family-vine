import { Sequelize, DataTypes } from 'sequelize';
import { defineMedia } from '@models/media.js';

describe('Media Model', () => {
  let sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false }); // In-memory DB for testing
    defineMedia(sequelize, DataTypes);
    await sequelize.sync(); // Sync the model
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Model has correct attributes', () => {
    const attributes = Object.keys(sequelize.models.Media.rawAttributes);
    expect(attributes).toEqual(
      expect.arrayContaining([
        'id',
        'filePath',
        'date',
        'location',
        'what_description',
        'why_description',
        'fileType',
      ])
    );
  });

  test('filePath is required and unique', async () => {
    expect.assertions(2);
    let tempDate = new Date('2000-01-02T:12:00:00Z');
    try {
      await sequelize.models.Media.create({ fileType: 'image/jpeg', date: tempDate }); // Missing filePath
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
    }

    await sequelize.models.Media.create({ filePath: 'uploads/photo1.jpg', fileType: 'image/png', date: tempDate });

    await expect(
      sequelize.models.Media.create({ filePath: 'uploads/photo1.jpg', fileType: 'image/jpeg', date: tempDate })
    ).rejects.toThrow();
  });

  test('date is required', async () => {
    expect.assertions(2);
    let tempDate = new Date('2000-01-02T:12:00:00Z');
    
    try {
      await sequelize.models.Media.create({ filePath: 'uploads/photo7.jpg', fileType: 'image/jpeg'}); // Missing date
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
    }

    const media = await sequelize.models.Media.create({ filePath: 'uploads/photo7.jpg', date: tempDate, fileType: 'image/png' });
    expect(media.date).toBe(tempDate);
  });

  test('location, descriptions, and fileType are optional', async () => {
    let tempDate = new Date('2000-01-02T:12:00:00Z');
    const media = await sequelize.models.Media.create({ filePath: 'uploads/photo2.jpg', date: tempDate });

    expect(media.location).toBe("");
    expect(media.what_description).toBe("");
    expect(media.why_description).toBe("");
    expect(media.fileType).toBe("");
  });

  test('Can create a media entry', async () => {
    let tempDate = new Date('2000-01-02T:12:00:00Z');
    const media = await sequelize.models.Media.create({
      filePath: 'uploads/photo3.jpg',
      date: tempDate,
      location: 'New York',
      what_description: 'A beautiful sunset',
      why_description: 'Memorable vacation',
      fileType: 'image/jpeg',
    });

    expect(media.id).toBeDefined();
    expect(media.filePath).toBe('uploads/photo3.jpg');
    expect(media.date).toBe(tempDate);
    expect(media.location).toBe('New York');
    expect(media.what_description).toBe('A beautiful sunset');
    expect(media.why_description).toBe('Memorable vacation');
    expect(media.fileType).toBe('image/jpeg');
  });

  test('Can fetch a media entry', async () => {
    let tempDate = new Date('2000-01-02T:12:00:00Z');
    await sequelize.models.Media.create({ filePath: 'uploads/photo4.jpg', date: tempDate, location: 'Paris' });

    const media = await sequelize.models.Media.findOne({ where: { filePath: 'uploads/photo4.jpg' } });

    expect(media).not.toBeNull();
    expect(media.location).toBe('Paris');
  });

  test('Can update a media entry', async () => {
    let tempDate = new Date('2000-01-02T:12:00:00Z');
    const media = await sequelize.models.Media.create({ filePath: 'uploads/photo5.jpg', date: tempDate, location: 'London' });

    await media.update({ location: 'Tokyo', fileType: 'image/png' });

    const updatedMedia = await sequelize.models.Media.findByPk(media.id);
    expect(updatedMedia.location).toBe('Tokyo');
    expect(updatedMedia.fileType).toBe('image/png');
  });

  test('Can delete a media entry', async () => {
    let tempDate = new Date('2000-01-02T:12:00:00Z');
    const media = await sequelize.models.Media.create({ filePath: 'uploads/photo6.jpg', date: tempDate });

    await media.destroy();

    const deletedMedia = await sequelize.models.Media.findByPk(media.id);
    expect(deletedMedia).toBeNull();
  });
});
