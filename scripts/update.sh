aws s3api put-object \
  --bucket my-lambda-functions \
  --key GetMigueletQuote \
  --region eu-west-1 \
  --body ./dist.zip \
  
