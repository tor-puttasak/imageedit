import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin',
    },
  })

  console.log('✓ Created admin user:', admin.email)

  // Create default styles
  const styles = [
    {
      name: 'Anime Style',
      prompt: 'Transform this image into anime/manga style with vibrant colors, detailed linework, and characteristic Japanese animation aesthetics',
      order: 1,
    },
    {
      name: 'Oil Painting',
      prompt: 'Convert this image to look like a classical oil painting with visible brush strokes, rich textures, and artistic interpretation',
      order: 2,
    },
    {
      name: 'Watercolor',
      prompt: 'Transform into a watercolor painting style with soft edges, color bleeding effects, and delicate artistic touches',
      order: 3,
    },
    {
      name: 'Cyberpunk',
      prompt: 'Apply cyberpunk aesthetic with neon colors, futuristic elements, dark atmosphere, and high-tech urban environment',
      order: 4,
    },
    {
      name: 'Vintage Photo',
      prompt: 'Convert to vintage photography style with sepia tones, slight graininess, and nostalgic old-time photograph appearance',
      order: 5,
    },
  ]

  for (const style of styles) {
    const created = await prisma.style.upsert({
      where: { name: style.name },
      update: {},
      create: style,
    })
    console.log('✓ Created style:', created.name)
  }

  console.log('✨ Database seed completed!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
