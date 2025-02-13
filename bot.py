import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.types import Message, ReplyKeyboardMarkup, KeyboardButton, WebAppInfo
from aiogram.filters import Command

bot = Bot(token='7908200089:AAH5mmF9XrWbhfAdLGLsiySKIikqMPY871E')  # Замените на ваш токен
dp = Dispatcher()  # Инициализация Dispatcher без передачи bot

# Используем фильтр Command для обработки команды /start
@dp.message(Command("start"))
async def start(message: Message):
    keyboard = ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="Играть", web_app=WebAppInfo(url="https://pudge2.github.io"))]],
        resize_keyboard=True
    )
    await message.answer("Добро пожаловать в игру! Нажми 'Играть', чтобы начать.", reply_markup=keyboard)

async def main():
    await dp.start_polling(bot)  # Передаем bot в start_polling()

if __name__ == "__main__":
    asyncio.run(main())
