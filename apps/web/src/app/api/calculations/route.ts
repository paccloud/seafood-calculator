import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * POST /api/calculations
 * Creates a new calculation record
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { weight, pricePerPound, type } = body

    const calculation = await prisma.calculation.create({
      data: {
        weight,
        pricePerPound,
        totalCost: weight * pricePerPound,
        type
      }
    })

    return NextResponse.json(calculation)
  } catch (error) {
    console.error('Failed to create calculation:', error)
    return NextResponse.json(
      { error: 'Failed to create calculation' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/calculations
 * Retrieves recent calculations
 */
export async function GET() {
  try {
    const calculations = await prisma.calculation.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const prices = await prisma.priceConfiguration.findMany();

    return NextResponse.json({ calculations, prices });
  } catch (error) {
    console.error('Failed to fetch calculations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch calculations' },
      { status: 500 }
    )
  }
}
