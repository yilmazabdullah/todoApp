from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import todos
from app.db.database import engine, Base

# Uygulama başlatıldığında veritabanı tablolarını yoksa oluşturur.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo App API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Endpointlerini bağlama yapısı. Yeni eklenecek sayfalar / API'ler bu şekilde kolayca bağlanabilir:
app.include_router(todos.router, prefix="/api/todos", tags=["Todos"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Todo API! Follow to /docs for Swagger documentation."}
