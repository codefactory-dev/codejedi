const express = require('express'),
      router = express.Router({mergeParams: true}),
      axios = require('axios'),
      Code = require('../models/code'),
      languageTypes = require('../src/utils/languageTypes.js');

// API calls
router.get('/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

function unescape(str) {
  var newStr = str;
  newStr = newStr.replace(/\\(^)/g, '');
  newStr = escapeQuotes(newStr);
  newStr = newStr.trim();
  return newStr;
  function unescapeQuotes(string) {
    return string.replace(/\\"/g, '"');
  }
  function escapeQuotes(string) {
    return string.replace(/"/g, '\\"');
  }
}

function languageToParam(language){
  let res;
  let fileName;
  switch(language){

    case languageTypes.Javascript:
      res = "javascript";
      fileName = "main.js";
      break;
    case languageTypes.Java:
      res = "java";
      fileName = "Main.java"
      break;
    default:
      res = "javascript";
      fileName = "main.js";
      break;
  }
  return {
    languageName: res,
    fileName: fileName
  };
}

router.post('/compile', async (req,res) => {
  const payload = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Token '+process.env.GLOT_IO_TOKEN
  }
  console.log("these are the headers: ");
  for (key in payload){
    console.log( key + ": " + payload[key]);
  }
  //var text = unescape(req.body.code);
  var text = (req.body.code);
  console.log("text = "+text+"\n\n\n");
  const {languageName, fileName} = languageToParam(req.body.language);
  const body = {
    files: [
        {
            name: fileName, 
            content: text
        }
    ]
  }
  console.log("body = "+body);
  console.log("lang = "+languageName);
  console.log("file = "+fileName);
  try{
    const result = await axios({
      method: 'post',
      url: `https://run.glot.io/languages/${languageName}/latest`,
      data: body,
      headers: payload
    });
    console.log("finished waiting....\n")
    console.log(result.config.data);
    res.status(200).send(result.data);
  } catch(e){
    console.log("error "+e);
    res.status(500).send(e.message);
  }
  
})


// POST code
router.post('/codes', async (req,res) => {
  console.log(`REQUEST :: create code  ${req.body.mode}`);
  console.log(req.body);

  const newCode = {
    mode: req.body.mode,
    text: req.body.text
  };


  await Code.create(newCode)
          .then((resolve) => {
            console.log(`STATUS :: Success`);
            console.log(resolve);
            res.status(201).send(newCode);
          })
        .catch((e) => {
          console.error(`STATUS :: Ops.Something went wrong.`);
          res.status(500).json({
            error: true,
            message: e.toString()
          });
        });
});

module.exports = router;