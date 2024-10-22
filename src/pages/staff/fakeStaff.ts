import { faker } from "@faker-js/faker";

const createRandomStaff = () => ({
  id: faker.string.uuid(),
  fullName: faker.internet.displayName(),
  email: faker.internet.email(),
  status: 1,
  createdDate: faker.date.past(),
});

export const fakeStaffs = faker.helpers.multiple(createRandomStaff, {
  count: 10,
});
