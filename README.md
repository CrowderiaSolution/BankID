# BankID
Swedish bank Id implementation

POST : https://appapi2.test.bankid.com/rp/v4

# Reference : 
  https://www.bankid.com/assets/bankid/rp/bankid-relying-party-guidelines-v2.15.pdf
  
```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://bankid.com/RpService/v4.0.0/types/">
	<soapenv:Header />
	<soapenv:Body >
		<typ:orderRef >72993e89-3bf9-4c80-baa3-b100d2183c3b</typ:orderRef>
	</soapenv:Body>
</soapenv:Envelope>

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
