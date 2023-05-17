import {
  schemaMigrations,
  addColumns,
} from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        addColumns({
          table: 'user',
          columns: [
            {name: 'password', type: 'string'},
            {name: 'uid', type: 'string'},
          ],
        }),
      ],
    },
  ],
});
