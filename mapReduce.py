def mapper(cursor, field_id, field_amount, field_title=None):
    """Función para crear el mapa.

    Args:
        cursor (cursor): cursor iterable que aloja los documentos.
        field_id (str): campo id que sirve de clave para el mapa.
        field_amount (str): campo numerico que se guardará en lista para el reduce.
        field_title (str, opcional): campo que indica el nombre para el id. None por defecto.

    Returns:
        dict: diccionario con el siguiente formato
            { field_id: 
                {
                    title: field_title (opcional),
                    avg: [field_amount_1, field_amount_2, ..., field_amount_n]
                }
            }
    """
    dictCompleto = {}
    
    for document in cursor:
      code = document['fields'].get(field_id)
      title = document['fields'].get(field_title) if field_title else None
      avg = document['fields'].get(field_amount)
    
      tmp = dictCompleto.get(code, {})
    
      if not tmp:
        dictCompleto[code] = {'title': title, 'avg': [avg]} if field_title else {'avg': [avg]}
      else:
        tmp['avg'].append(avg)
    return dictCompleto

def reducer(mapped):
    """Función para aplicar reduce al mapa.

    Args:
        mapped (dict): mapa al que se aplicará el reduce.

    Returns:
        dict: diccionario con el siguiente formato
            { field_id: 
                {
                    title: field_title (opcional),
                    reduced: numero
                }
            }
    """
    import numpy as np
    for d in mapped:
      mapped[d]['reduced'] = np.mean(mapped[d]['avg'])
      mapped[d].pop('avg')
    return mapped

def write(jsonDict, name):
    """Función para escribir archivo JSON.

    Args:
        jsonDict (dict): mapa reducido
        name (str): nombre del archivo
    """
    import json
    fileName = f"{name}.json"
    file = open(fileName, "w")
    json.dump(jsonDict, file)
    file.close()

from pymongo import MongoClient

# Connection String de MongoDB apuntando al servicio Azure CosmosDB.
mongo_connection = "mongodb://proyecto1bda:<KEY>@proyecto1bda.mongo.cosmos.azure.com:10255/test?<CONFIG_PARAMETERS>"

# Se realiza la conexión y se obtiene la colección respectiva.
client = MongoClient(mongo_connection)
db = client.test
collection = db['census']

# Se obtiene los documentos mediante find y se aloja en cursor.
cursor = collection.find({}, {"_id": 1, "fields": 1})    
    
# Se realiza el map reduce de salarios semanales por industria.
mapped = mapper(cursor, "industry_code", "avg_wkly_wage", "industry_title")
reduced = reducer(mapped)
write(reduced, "industry_avg")

# Se realiza el map reduce de salarios semanales por área.
mapped = mapper(cursor=cursor, field_id="area_title", field_amount="avg_wkly_wage")
reduced = reducer(mapped)
write(reduced, "area_avg")
