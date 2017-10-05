import StatusCodes from 'http-status-codes'
import request from 'request'
import fs from 'fs'
import path from 'path'
import xml2js from 'xml2js'
import co from 'co'

let praser = new xml2js.Parser()
let certFile = path.resolve(__dirname, '../../cert/certificate')
let keyFile = path.resolve(__dirname, '../../cert/keyfile')
let waitingTime = 10

module.exports = {
    authenticateUser: (req, res, next) => {
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
        var dataObj = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://bankid.com/RpService/v4.0.0/types/">
        <soapenv:Header/>
        <soapenv:Body>
          <typ:AuthenticateRequest>
            <personalNumber>${req.body.personalid}</personalNumber>
            <endUserInfo>
              <type>IP_ADDR</type>
              <value>192.168.2.1</value>
            </endUserInfo>
            <requirementAlternatives>
              <requirement>
                <condition>
                  <key>CertificatePolicies</key>
                  <value>1.2.3.4.25</value>
                </condition>
              </requirement>
              <requirement>
                <condition>
                  <key>AllowFingerprint</key>
                  <value>no</value>
                </condition>
              </requirement>
            </requirementAlternatives>
          </typ:AuthenticateRequest>
        </soapenv:Body>
      </soapenv:Envelope>`
        var passphrase = 'qwerty123'
        request({
            url: 'https://appapi2.test.bankid.com/rp/v4',
            method: 'POST',
            headers: {
                'content-type': 'applicatiotvTvn/xml' // <--Very important!!!
            },
            cert: fs.readFileSync(certFile),
            key: fs.readFileSync(keyFile),
            passphrase: passphrase,
            body: dataObj
        }, function (error, response, body) {
            if (!error) {
                praser.parseString(response.body, (err, resData) => {
                    if (err) {
                        // res.status(HttpStatus.OK).json({orderRef: resData['soap:Envelope']['soap:Body'][0]['ns2:AuthResponse'][0]['orderRef'][0]}) 
                    }
                    if (resData['soap:Envelope']['soap:Body'][0]['soap:Fault'] === undefined) {
                        req.orderRef = resData['soap:Envelope']['soap:Body'][0]['ns2:AuthResponse'][0]['orderRef'][0]
                        next()
                    } else {
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json('error try again')
                    }
                })
            } else {
                res.status(HttpStatus.BAD_REQUEST).json(error)
            }
        })
    },

    generateAndSendToken: (req, res) => {
        co(function* () {
            yield waitAndDo(waitingTime)
        })

        function* waitAndDo(times) {
            for (var i = 0; i < times; i++) {
                // Sleep
                yield function (callback) {
                    setTimeout(callback, 1000)
                }

                getBanckIdSignature(req.orderRef).then((_response) => {
                    times = waitingTime
                    res.status(HttpStatus.OK).json(_response)
                }, (_err) => {
                    if (i == waitingTime) { res.status(HttpStatus.UNAUTHORIZED).json('_err occur') }
                })
            }
        }
    }
}

const getBanckIdSignature = (orderRef) => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
    let dataBody = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://bankid.com/RpService/v4.0.0/types/">
    <soapenv:Header />
    <soapenv:Body >
      <typ:orderRef >${orderRef}</typ:orderRef>
    </soapenv:Body>
  </soapenv:Envelope>
    `
    return new Promise((resolve, reject) => {
        request({
            url: 'https://appapi2.test.bankid.com/rp/v4',
            method: 'POST',
            headers: {
                'content-type': 'application/xml' // <--Very important!!!
            },
            cert: fs.readFileSync(certFile),
            key: fs.readFileSync(keyFile),
            passphrase: 'qwerty123',
            body: dataBody
        }, function (error, response, body) {
            if (response.statusCode == 200) {
                praser.parseString(response.body, (err, user) => {
                    if (err) {
                        return reject(err)
                    }

                    if (user['soap:Envelope']['soap:Body'][0]['ns2:CollectResponse'][0]['progressStatus'][0] === 'COMPLETE') {
                        let userObject = user['soap:Envelope']['soap:Body'][0]['ns2:CollectResponse'][0]['userInfo'][0]
                        userObject.token = 'asdsadasasqw09d8y9asd9hoa90sdgas9bdas8gda79sgd'
                        userObject.refreshtoken = 'asdasdasdas09duasdnasdhas0dashd0asdhas0dh0as8hd'
                        resolve(userObject)
                        // signature: user['soap:Envelope']['soap:Body'][0]['ns2:CollectResponse'][0]['signature'][0]
                    } else {
                        return reject(error)
                    }
                })
            }
        })
    })
}
