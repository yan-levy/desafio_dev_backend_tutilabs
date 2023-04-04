import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const statusData = [
    { id: 1, description: 'To Evaluate' },
    { id: 2, description: 'Homologated' },
    { id: 3, description: 'Disapproved' },
  ];

  const isEmptyStatus = await prisma.status.findMany({}).then((status) => {
    return status.length === 0;
  });

  if (isEmptyStatus) {
    await prisma.status.createMany({
      data: statusData,
    });
  }

  const roleData = [
    { id: 1, description: 'scriptwriter' },
    { id: 2, description: 'production_company' },
    { id: 3, description: 'master' },
  ];

  const isEmptyRole = await prisma.role.findMany({}).then((role) => {
    return role.length === 0;
  });

  if (isEmptyRole) {
    await prisma.role.createMany({
      data: roleData,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
