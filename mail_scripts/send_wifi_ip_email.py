#!/usr/bin/env python
''' https://www.tutorialspoint.com/python/python_sending_email.htm	'''

import smtplib
import commands
import urllib2
import time
import base64	#to hide password

def internet_on():
    for timeout in [1,5,10,15]:
        try:
            response=urllib2.urlopen('http://google.com',timeout=timeout)
            return True
        except urllib2.URLError as err: pass
    return False

class Gmail(object):
    def __init__(self, email, password):
        self.email = email
        self.password = password
        #GMAIL INFO
        self.server = 'smtp.gmail.com'
        self.port = 587
        session = smtplib.SMTP(self.server, self.port)
        #TLS encryption
        session.ehlo()
        session.starttls()
        session.ehlo
        session.login(self.email, self.password)
        self.session = session

    def send_message(self, subject, body):
        ''' This must be removed '''
        headers = [
            "From: " + self.email,
            "Subject: " + subject,
            "To: " + self.email,
            "Cc: " + "12428330@uts.edu.au", 
            "MIME-Version: 1.0",
           "Content-Type: text/html"]
        headers = "\r\n".join(headers)
        try:
            self.session.sendmail(
            self.email,	#FROM
            self.email + ", ithai@sice.com.au", #TO + CC
            headers + "\r\n\r\n" + body)
            print(headers + "\r\n\r\n" + body)
            print ("Successfully sent email")
        except smtplib.SMTPException:
            print ("Error: unable to send email")
			
        self.session.quit()

#get IP configuration
for timeout in [60,120,180,240]:
    print(timeout)
    if(internet_on()):
        intf = 'wlan0'
        intf_ip = commands.getoutput("ip address show dev " + intf).split()
        intf_ip = intf_ip[intf_ip.index('inet') + 1].split('/')[0]
        ips="WIFI ip: " + intf_ip
        break
    else:
        ips="WIFI not connected"
	time.sleep(timeout)
print(ips)

try:
    gm = Gmail('ilya.thai1@gmail.com', base64.b64decode("dGVkbW9zYnkxIQ==\n"))
    gm.send_message('Wifi config', ips)
except smtplib.SMTPException:
       print ("Error: google authentication ERROR")
