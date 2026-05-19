import jwt from 'jsonwebtoken';

export const authGuard = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Sem token!' });
    }

    const [, token] = authHeader.split(' ');
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return res.status(500).json({ error: 'JWT_SECRET is not configured' });
    }

    try {
        const decoded = jwt.verify(token, secret) as { id: number };
        req.userId = decoded.id;
        return next();
    } catch {
        return res.status(401).json({ error: 'Token inválido!' });
    }
};