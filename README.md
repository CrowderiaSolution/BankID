# BankID
Swedish bank Id implementation

## Docs

1. [Features](#features)
1. [BankID](#bankid)
1. **Before you start**
   1. [VsCode Configaration](/docs/vscode_config.md)
   1. [Babel Configaration](/docs/bable_config.md)
   1. [Understanding the File Structure](#understanding-the-file-structure)
1. **Using Template**
   1. [Renaming the App from New](/docs/renaming.md)
   1. [Routing / Navigating](/src/navigation/README.md)
   1. [Testing](/docs/testing.md)
1. [Contributing](/docs/contributing.md)
1. [Licence](LICENSE)


## Features

| Feature | Summary |
| --- | --- |

# BankID
Post Endpoint

`POST : https://appapi2.test.bankid.com/rp/v4`

# Reference : 
  https://www.bankid.com/assets/bankid/rp/bankid-relying-party-guidelines-v2.15.pdf
  https://www.bankid.com/bankid-i-dina-tjanster/rp-info
  
  
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://bankid.com/RpService/v4.0.0/types/">
	<soapenv:Header />
	<soapenv:Body >
		<typ:orderRef >72993e89-3bf9-4c80-baa3-b100d2183c3b</typ:orderRef>
	</soapenv:Body>
</soapenv:Envelope>

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://bankid.com/RpService/v4.0.0/types/">
	<soapenv:Header/>
	<soapenv:Body>
		<typ:AuthenticateRequest>
			<personalNumber>197606100399</personalNumber>
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
</soapenv:Envelope>
```

# Response ( if user still not authenticated )

```
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <ns2:CollectResponse xmlns:ns2="http://bankid.com/RpService/v4.0.0/types/">
            <progressStatus>OUTSTANDING_TRANSACTION</progressStatus>
        </ns2:CollectResponse>
    </soap:Body>
</soap:Envelope>
```
