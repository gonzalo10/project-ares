from sanic import Sanic
from sanic import response

import json
from newspaper import Article

app = Sanic(__name__)


@app.route('/')
def handle_request(request):

    url = request.json.get("url")
    article = Article(url)
    article.download()
    article.parse()

    return response.json([{
        'article': article,
    }], status=200)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8006)
