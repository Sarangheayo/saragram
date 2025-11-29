/**
 * @file databases/seeders/dummy-users.seeder.js
 * @description users table dummy data create
 * 251118 v1.0.0 sara init
*/
import bcrypt from 'bcrypt';
// 복구화 불가능한, 단방향 암호화해주는 친구

// 테이블 명
const tableName = 'users';

/**
 @type {import('sequelize-cli').Migration} */
 export default {
   async up (queryInterface, Sequelize) {
     // 레코드 정보
     const records = [
       {
         email: 'admin@admin.com',
         password: bcrypt.hashSync('qwe12312', 10),
         // 여기서 10 = salt = 소금, 얘는 비동기임
         nick: '설아관리자',
         provider: 'NONE',
         role: 'SUPER',
         profile: '',
         // 리프레시 토큰 필요 X
         // bulkInsert는 model 객체 X, CRUD가 자동관리 안됨. 
         created_at: new Date(),
         updated_at: new Date()
       },
       {
         email: 'admin2@admin.com',
         password: bcrypt.hashSync('qwe12312', 10),
         // 여기서 10 = salt = 소금, 얘는 비동기임
         nick: '설아관리자2',
         provider: 'KAKAO',
         role: 'NORMAL',
         profile: '',
         // 리프레시 토큰 필요 X
         // bulkInsert는 model 객체 X, CRUD가 자동관리 안됨. 
         created_at: new Date(),
         updated_at: new Date()
       }
     ]; 
   
   // 데이터 생성: await queryInterface.bulkInsert(tableName, records, options );
   await queryInterface.bulkInsert(tableName, records, {} );
   // 마지막 {} 얘는 options , 안적어줘도 ㄱㅊ
  },
  
  async down (queryInterface, Sequelize) {
      // 데이터 삭제: await queryInterface.bulkDelete(tableName, null, options );
      await queryInterface.bulkDelete(tableName, null, {});
  }
};

