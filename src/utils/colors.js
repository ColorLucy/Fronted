export const convertirColor = (colorEnEspanol) => {
    const mapaDeColores = {
        "ROSADA": "#FFC0CB",
        "ROJO": "#FF0000",
        "AZUL": "#0000FF",
        "ROJA": "#FF0000",
        "VERDE": "#008000",
        "AMARILLO": "#FFFF00",
        "BRONCE": "#CD7F32",
        "NEUTRO": "#F5F5F5",
        "GRIS": "#808080",
        "AMARILLA": "#FFFF00",
        "BLANCA": "#FFFFFF",
        "NEGRO": "#000000",
        "BLANCO": "#FFFFFF"

    };

    return mapaDeColores[colorEnEspanol.toUpperCase()] || null;
}
