import { Sequelize, DataTypes } from 'sequelize';
import { defineMedia } from '@models/media.js';

describe('Media Model', () => {
  let sequelize;
  let Media;

  beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false }); // In-memory DB for testing
    Media = defineMedia(sequelize, DataTypes);
    await sequelize.sync(); // Sync the model
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Model has correct attributes', () => {
    const attributes = Object.keys(Media.rawAttributes);
    expect(attributes).toEqual(
      expect.arrayContaining([
        'id',
        'filePath',
        'location',
        'what_description',
        'why_description',
        'fileType',
      ])
    );
  });

  test('filePath is required and unique', async () => {
    expect.assertions(2);
    
    try {
      await Media.create({ fileType: 'image/jpeg' }); // Missing filePath
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
    }

    await Media.create({ filePath: 'uploads/photo1.jpg', fileType: 'image/png' });

    await expect(
      Media.create({ filePath: 'uploads/photo1.jpg', fileType: 'image/jpeg' })
    ).rejects.toThrow();
  });

  test('location, descriptions, and fileType are optional', async () => {
    const media = await Media.create({ filePath: 'uploads/photo2.jpg' });

    expect(media.location).toBeNull();
    expect(media.what_description).toBeNull();
    expect(media.why_description).toBeNull();
    expect(media.fileType).toBeNull();
  });

  test('Can create a media entry', async () => {
    const media = await Media.create({
      filePath: 'uploads/photo3.jpg',
      location: 'New York',
      what_description: 'A beautiful sunset',
      why_description: 'Memorable vacation',
      fileType: 'image/jpeg',
    });

    expect(media.id).toBeDefined();
    expect(media.filePath).toBe('uploads/photo3.jpg');
    expect(media.location).toBe('New York');
    expect(media.what_description).toBe('A beautiful sunset');
    expect(media.why_description).toBe('Memorable vacation');
    expect(media.fileType).toBe('image/jpeg');
  });

  test('Can fetch a media entry', async () => {
    await Media.create({ filePath: 'uploads/photo4.jpg', location: 'Paris' });

    const media = await Media.findOne({ where: { filePath: 'uploads/photo4.jpg' } });

    expect(media).not.toBeNull();
    expect(media.location).toBe('Paris');
  });

  test('Can update a media entry', async () => {
    const media = await Media.create({ filePath: 'uploads/photo5.jpg', location: 'London' });

    await media.update({ location: 'Tokyo', fileType: 'image/png' });

    const updatedMedia = await Media.findByPk(media.id);
    expect(updatedMedia.location).toBe('Tokyo');
    expect(updatedMedia.fileType).toBe('image/png');
  });

  test('Can delete a media entry', async () => {
    const media = await Media.create({ filePath: 'uploads/photo6.jpg' });

    await media.destroy();

    const deletedMedia = await Media.findByPk(media.id);
    expect(deletedMedia).toBeNull();
  });
});
