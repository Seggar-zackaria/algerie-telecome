import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

// @desc    Get dashboard statistics
// @route   GET /api/stats
// @access  Private
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [
      totalRegistrations,
      pendingRegistrations,
      totalContent,
      activeHeroSlides,
      recentRegistrations
    ] = await Promise.all([
      prisma.registration.count(),
      prisma.registration.count({ where: { status: 'PENDING' } }),
      prisma.content.count(),
      prisma.heroSlide.count({ where: { isActive: true } }),
      prisma.registration.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fullName: true,
          email: true,
          status: true,
          createdAt: true
        }
      })
    ]);

    res.json({
      registration: {
        total: totalRegistrations,
        pending: pendingRegistrations,
      },
      content: {
        total: totalContent,
      },
      heroSlides: {
        active: activeHeroSlides,
      },
      recentActivity: recentRegistrations
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server Error fetching stats' });
  }
};
