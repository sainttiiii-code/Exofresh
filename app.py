from flask import Flask, render_template


app = Flask(__name__)


PRODUCTS = [
    {
        "id": "poroto",
        "name": "Poroto",
        "image": "poroto.svg",
        "description": "Una paleta cremosa y sorprendente con notas suaves de poroto dulce.",
        "price": 11.00,
        "accent": "#8a3f6b",
    },
    {
        "id": "camote",
        "name": "Camote",
        "image": "camote.svg",
        "description": "Dulzor natural, textura aterciopelada y un final cálido tropical.",
        "price": 12.00,
        "accent": "#ec7a3c",
    },
    {
        "id": "pistacho-pina-yerba-buena",
        "name": "Pistacho + Piña + Yerba Buena",
        "image": "pistacho-pina-yerba-buena.svg",
        "description": "Crujiente, fresco y brillante: una mezcla verde con alma caribeña.",
        "price": 15.00,
        "accent": "#67a84f",
    },
    {
        "id": "yuca",
        "name": "Yuca",
        "image": "yuca.svg",
        "description": "Sabor delicado de raíz tropical con un toque dulce y limpio.",
        "price": 11.50,
        "accent": "#c89c56",
    },
    {
        "id": "matcha",
        "name": "Matcha",
        "image": "matcha.svg",
        "description": "Elegante, herbal y refrescante, hecha para paladares curiosos.",
        "price": 14.00,
        "accent": "#4f8d43",
    },
    {
        "id": "frutilla-remolacha",
        "name": "Frutilla + Remolacha",
        "image": "frutilla-remolacha.svg",
        "description": "Frutal, intensa y naturalmente vibrante con un color irresistible.",
        "price": 13.50,
        "accent": "#d93f64",
    },
    {
        "id": "zanahoria-mango",
        "name": "Zanahoria + Mango",
        "image": "zanahoria-mango.svg",
        "description": "Mango jugoso y zanahoria dulce en una combinación soleada.",
        "price": 13.00,
        "accent": "#f2a12c",
    },
]


@app.route("/")
def home():
    return render_template("index.html", products=PRODUCTS)


if __name__ == "__main__":
    app.run(debug=True)