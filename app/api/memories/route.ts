import { type NextRequest, NextResponse } from "next/server"
import prisma from "../../../lib/prisma"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = Number.parseInt(searchParams.get("page") || "1")
        const limit = Number.parseInt(searchParams.get("limit") || "10")
        const skip = (page - 1) * limit

        const [memories, total] = await Promise.all([
            prisma.memory.findMany({
                orderBy: {
                    createdAt: "desc",
                },
                skip,
                take: limit,
            }),
            prisma.memory.count(),
        ])

        const totalPages = Math.ceil(total / limit)

        return NextResponse.json({
            memories,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        })
    } catch (error) {
        console.error("Error fetching memories:", error)
        return NextResponse.json({ error: "Failed to fetch memories" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, relationship, message } = body

        // Validate required fields
        if (!name || !relationship || !message) {
            return NextResponse.json({ error: "Name, relationship, and message are required" }, { status: 400 })
        }

        const memory = await prisma.memory.create({
            data: {
                name: name.trim(),
                relationship: relationship.trim(),
                message: message.trim(),
            },
        })

        return NextResponse.json(memory, { status: 201 })
    } catch (error) {
        console.error("Error creating memory:", error)
        return NextResponse.json({ error: "Failed to create memory" }, { status: 500 })
    }
}
