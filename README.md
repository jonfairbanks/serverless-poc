# serverless-poc

## Getting Started
### Get AWS ACCESS KEYS
aws console > top right/user profile > security credentials > access keys > create access key

### Configure AWS cli to use credentials 
run `aws configure`
provide access key and secret key

### Deploy terraform infrastructure
#### Configure TF Vars
open `infrastructure/terraform.tfvars` and set your primary domain (this will be used to create the dns zone in route 53)
*These could and probably should be defined in a terraform cloud workspace or otherwise in an env variables or passed as arguments to terraform cli (another problem for another day)

#### Deploy

`cd infrastructure`

`terraform init`

`terraform plan`

`terraform apply`

## Point domain to AWS Route 53
https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/migrate-dns-domain-in-use.html

### Get NS servers from zone and set your NS record for the domain to include those 4 name servers
In the Route 53 console, get the name servers for your hosted zone:
- Sign in to the AWS Management Console and open the Route 53 console at https://console.aws.amazon.com/route53/.
- In the navigation pane, choose Hosted zones.
- On the Hosted zones page, choose the name for the applicable hosted zone.
- Make note of the four names listed for Name servers in the Hosted zone details section.
- Set NS servers of domain in your registrar to point to AWS NS servers

### Validate certificates are valid (can take as long as the TTL to update name servers takes + some)
open aws certificate manager and see 'status' of the certificate for the domain you specified

## Deploy serverless functions
cd ../services/notes

run `sls deploy`

## Run front end (WIP)
rename `.env.example` to `.env` and update to your domain

run `npm start`

## TODO:
 - [ ] Make react actually use env vars for api endpoint :D
 - [ ] Deploy a db with terraform and use it for the notes service
 - [ ] Deploy an s3 bucket and cloudfront distribution with terraform and add front end deployment script
 - [ ] Make react front end use SSM key store for environment variables like serverless and terraform do
 - [ ] Terraform cloud workspace implementation?
 - [ ] Organize terraform resources much more nicely :D 

## Remove everything
cd infrastructure and run `terraform destroy`
cd services/notes and run `sls remove`