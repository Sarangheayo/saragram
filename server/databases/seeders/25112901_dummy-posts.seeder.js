/**
 * @file databases/seeders/dummy-posts.seeder.js
 * @description posts table dummy data create
 * 251128 v1.0.0 sara init
*/

import { fakerKO } from '@faker-js/faker';
import db from '../../app/models/index.js';
const { Sequelize, User, Post } = db;
   

/** @type {import('sequelize-cli').Migration} */
 export default {
   async up (queryInterface, Sequelize) {
    // user PK 획득
    // select id from Users where deleted_at is null;
    const users = await User.findAll(
      {
        attributes: ['id']
      }
    );  

    // 유저별 게시글 데이터 생성
    for (const user of users) {
      for(let i = 0; i < 10; i++) {
        const date = fakerKO.date.between({ from: '2025-11-01' , to: Date.now()});
        await Post.create({
          userId: user.id,
          content: fakerKO.lorem.text().substring(0, 100),
          image: fakerKO.image.url(),
          createdAt: date,
          updatedAt: date,
        });
      }
    } 
  },
  
  async down (queryInterface, Sequelize) {
     await Post.destroy({ force: true });
  }
};
