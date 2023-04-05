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

  const riskData = [
    { id: 1, description: 'Low', percent: 5 },
    { id: 2, description: 'Medium', percent: 10 },
    { id: 3, description: 'High', percent: 20 },
  ];

  const isEmptyRisk = await prisma.risk.findMany({}).then((risk) => {
    return risk.length === 0;
  });

  if (isEmptyRisk) {
    await prisma.risk.createMany({
      data: riskData,
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
