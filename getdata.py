from googlesearch import search
from bs4 import BeautifulSoup as BS
import requests
import math
import os
import json
import re
import random
import sys
import traceback
from os import walk
from collections import Counter

def getHTML(URL):
    try:
        ping = requests.get(URL).elapsed.total_seconds()
        site = requests.get(URL)
        soup = BS(site.text, 'html.parser')
        tags = soup.findAll()
        count = Counter([tag.name for tag in tags])
        titleTags = soup.findAll('title')
        file = URL
        obj = {}
        SSL = URL.startswith('https')
        robotsURL = URL + '/robots.txt'
        robotsFile = requests.get(robotsURL)
        robots = False
        if robotsFile.status_code == 200:
            robots = True
        errors = json.loads(requests.get("https://validator.nu/?doc="+URL+"&out=json").text)
        obj['tags'] = dict(count)
        obj['ping'] = ping
        obj['ssl'] = SSL
        obj['url'] = URL
        obj['robots'] = True
        obj['errors'] = len(errors['messages'])
        return obj
    except:
        return False


if len(sys.argv) > 1:
    # try:
    print(json.dumps(getHTML(sys.argv[1])))
    # except Exception, err:
    #     traceback.print_exc()
    sys.stdout.flush()
else:
    print(getHTML('https://www.google.com'))
