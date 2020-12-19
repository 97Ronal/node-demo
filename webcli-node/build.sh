rm -rf tmp
rm -f *.zip
zip -r test.zip app config app.js package.json
mkdir sq-epidemic-business
unzip test.zip -d sq-epidemic-business
rm test.zip
cd sq-epidemic-business
npm i --production
cd ..