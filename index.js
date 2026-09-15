const mineflayer = require("mineflayer");
const { pathfinder } = require("mineflayer-pathfinder");

const config = {
    host: "Bharosa0Smp.aternos.me",
    port: 11964,
    username: "SOULSMP",
    version: "26.2",
    password: "SKSHIVAM"
};

let bot;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function createBot() {
    console.log("🔄 Connecting SOULSMP...");

    bot = mineflayer.createBot({
        host: config.host,
        port: config.port,
        username: config.username,
        version: config.version
    });

    bot.loadPlugin(pathfinder);

    bot.once("spawn", async () => {
        console.log("✅ SOULSMP joined the server!");

        await sleep(3000);

        bot.chat(`/register ${config.password}`);
        console.log("📝 Register command sent");

        await sleep(3000);

        bot.chat(`/login ${config.password}`);
        console.log("🔐 Login command sent");

        await sleep(3000);

        startBehaviour();
    });

    bot.on("chat", (username, message) => {
        if (username === bot.username) return;

        console.log(`💬 ${username}: ${message}`);

        if (message.toLowerCase().includes("hello")) {
            bot.chat(`Hello ${username}!`);
        }
    });

    bot.on("health", () => {
        console.log(`❤️ Health: ${bot.health} | 🍗 Food: ${bot.food}`);
    });

    bot.on("playerJoined", player => {
        console.log(`👤 ${player.username} joined`);
    });

    bot.on("playerLeft", player => {
        console.log(`👋 ${player.username} left`);
    });

    bot.on("kicked", reason => {
        console.log("❌ Kicked:", reason);
    });

    bot.on("error", error => {
        console.log("⚠️ Error:", error.message);
    });

    bot.on("end", () => {
        console.log("🔄 Disconnected. Reconnecting in 10 seconds...");

        setTimeout(createBot, 10000);
    });
}

function startBehaviour() {

    // Random movement
    setInterval(() => {
        if (!bot.entity) return;

        const moves = ["forward", "back", "left", "right"];
        const move = moves[Math.floor(Math.random() * moves.length)];

        bot.setControlState(move, true);

        setTimeout(() => {
            bot.setControlState(move, false);
        }, 1500 + Math.random() * 2500);

    }, 6000);

    // Random jumping
    setInterval(() => {
        if (!bot.entity) return;

        bot.setControlState("jump", true);

