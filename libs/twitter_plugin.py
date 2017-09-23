#!/usr/bin/python
# -*- coding: UTF-8 -*-
import sys
from twython import Twython

CONSUMER_KEY = 'XkrYkxlQCxbpibFHD8VBOp2AM'
CONSUMER_SECRET = 'k6JD2rwoFn3vg46abcxx8ZBJGgYVN4Vpoo1cVVC3JOC4dDwDkZ'
ACCESS_KEY = '911083354556006400-PvWxpYdX9O2UITg1O50P0vk1ZwlWSIN'
ACCESS_SECRET = 'mGGIqlBWE9v9VReAzZjldDNEq1iPBDzyzfswYXVYCdUwn'

api = Twython(CONSUMER_KEY, CONSUMER_SECRET,ACCESS_KEY, ACCESS_SECRET)

api.update_status( status=sys.argv[1])