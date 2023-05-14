import { rest } from 'msw';

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const handlers = [
    rest.get("http://localhost:3030/scoops", async (req, res, ctx) => {
        await sleep(800);
        return res(
            ctx.json([
                { name: 'Chocolate', imagePath: '/images/chocolate.png' },
                { name: 'Vanilla', imagePath: '/images/vanilla.png' }
            ])
        );
    }),

    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        return res(
            ctx.json([
                { "name": "M&Ms", imagePath: "/images/m-and-ms.png" },
                { name: "Mochi", imagePath: "/images/mochi.png" },
                { name: "Cherries", imagePath: "/images/cherries.png" },
            ])
        );
    }),

    rest.post("http://localhost:3030/order", async (req, res, ctx) => {
        await sleep(100);
        return res(
            ctx.json({ orderNumber: 12345 }));
    }),
];