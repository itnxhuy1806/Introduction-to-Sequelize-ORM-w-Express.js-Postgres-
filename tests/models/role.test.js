import TestsHelpers from '../tests-helpers'
import models from '../../src/models'

describe('Role',()=>{
     beforeAll(async () => {
          await TestsHelpers.startDb();
     })
     afterAll(async () => {
          await TestsHelpers.stopDb();
     })
     beforeEach(async () => {
          await TestsHelpers.syncDb();
     })
     it('should delete the role if the user is deleted', async () => {
          const {Role} = models
          const roleForNewUser = ['admin','customer']
          const user = await TestsHelpers.createNewUser({roles:roleForNewUser});
          let rolesCount = await Role.count()
          expect(rolesCount).toEqual(roleForNewUser.length)
          await user.destroy()
          rolesCount = await Role.count()
          expect(rolesCount).toEqual(0)
     })
})