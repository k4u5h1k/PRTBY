import logging
import requests
import json
import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    endpoint = req.params.get('endpoint')
    resp = requests.get(
            f"https://apibay.org/{endpoint}.php",
            params = req.params
    ).json()

    if endpoint:
        return func.HttpResponse(
            json.dumps(resp),
            mimetype="application/json"
        )
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.",
             status_code=200
        )
