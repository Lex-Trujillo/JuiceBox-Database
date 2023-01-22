{"filter":false,"title":"index.js","tooltip":"/api/index.js","undoManager":{"mark":33,"position":33,"stack":[[{"start":{"row":0,"column":0},"end":{"row":7,"column":27},"action":"insert","lines":["// api/index.js","const express = require('express');","const apiRouter = express.Router();","","const usersRouter = require('./users');","apiRouter.use('/users', usersRouter);","","module.exports = apiRouter;"],"id":1}],[{"start":{"row":0,"column":15},"end":{"row":1,"column":0},"action":"insert","lines":["",""],"id":2}],[{"start":{"row":1,"column":0},"end":{"row":1,"column":36},"action":"insert","lines":["const jwt = require('jsonwebtoken');"],"id":3}],[{"start":{"row":0,"column":0},"end":{"row":0,"column":15},"action":"remove","lines":["// api/index.js"],"id":4}],[{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"remove","lines":["",""],"id":5}],[{"start":{"row":0,"column":36},"end":{"row":1,"column":0},"action":"insert","lines":["",""],"id":6}],[{"start":{"row":1,"column":0},"end":{"row":1,"column":41},"action":"insert","lines":["const { getUserById } = require('../db');"],"id":7}],[{"start":{"row":1,"column":19},"end":{"row":1,"column":20},"action":"insert","lines":["F"],"id":8},{"start":{"row":1,"column":20},"end":{"row":1,"column":21},"action":"insert","lines":["o"]},{"start":{"row":1,"column":21},"end":{"row":1,"column":22},"action":"insert","lines":["r"]},{"start":{"row":1,"column":22},"end":{"row":1,"column":23},"action":"insert","lines":["A"]},{"start":{"row":1,"column":23},"end":{"row":1,"column":24},"action":"insert","lines":["p"]},{"start":{"row":1,"column":24},"end":{"row":1,"column":25},"action":"insert","lines":["i"]}],[{"start":{"row":1,"column":47},"end":{"row":2,"column":0},"action":"insert","lines":["",""],"id":9}],[{"start":{"row":2,"column":0},"end":{"row":2,"column":35},"action":"insert","lines":["const { JWT_SECRET } = process.env;"],"id":10}],[{"start":{"row":3,"column":0},"end":{"row":4,"column":0},"action":"insert","lines":["",""],"id":11}],[{"start":{"row":9,"column":0},"end":{"row":10,"column":0},"action":"insert","lines":["",""],"id":12}],[{"start":{"row":6,"column":0},"end":{"row":7,"column":0},"action":"insert","lines":["",""],"id":15}],[{"start":{"row":7,"column":0},"end":{"row":32,"column":3},"action":"insert","lines":["apiRouter.use(async (req, res, next) => {","  const prefix = 'Bearer ';","  const auth = req.header('Authorization');","","  if (!auth) { // nothing to see here","    next();","  } else if (auth.startsWith(prefix)) {","    const token = auth.slice(prefix.length);","","    try {","      const { id } = jwt.verify(token, JWT_SECRET);","","      if (id) {","        req.user = await getUserById(id);","        next();","      }","    } catch ({ name, message }) {","      next({ name, message });","    }","  } else {","    next({","      name: 'AuthorizationHeaderError',","      message: `Authorization token must start with ${ prefix }`","    });","  }","});"],"id":16}],[{"start":{"row":32,"column":3},"end":{"row":33,"column":0},"action":"insert","lines":["",""],"id":17}],[{"start":{"row":20,"column":36},"end":{"row":20,"column":37},"action":"insert","lines":["F"],"id":18},{"start":{"row":20,"column":37},"end":{"row":20,"column":38},"action":"insert","lines":["o"]},{"start":{"row":20,"column":38},"end":{"row":20,"column":39},"action":"insert","lines":["r"]}],[{"start":{"row":20,"column":39},"end":{"row":20,"column":40},"action":"insert","lines":[" "],"id":19}],[{"start":{"row":20,"column":39},"end":{"row":20,"column":40},"action":"remove","lines":[" "],"id":20}],[{"start":{"row":20,"column":39},"end":{"row":20,"column":40},"action":"insert","lines":["A"],"id":21},{"start":{"row":20,"column":40},"end":{"row":20,"column":41},"action":"insert","lines":["p"]},{"start":{"row":20,"column":41},"end":{"row":20,"column":42},"action":"insert","lines":["i"]}],[{"start":{"row":37,"column":0},"end":{"row":38,"column":0},"action":"insert","lines":["",""],"id":22}],[{"start":{"row":37,"column":0},"end":{"row":42,"column":3},"action":"insert","lines":["apiRouter.use((error, req, res, next) => {","  res.send({","    name: error.name,","    message: error.message","  });","});"],"id":23}],[{"start":{"row":14,"column":43},"end":{"row":14,"column":44},"action":"insert","lines":["+"],"id":24}],[{"start":{"row":14,"column":44},"end":{"row":14,"column":46},"action":"insert","lines":["\"\""],"id":25}],[{"start":{"row":14,"column":45},"end":{"row":14,"column":46},"action":"insert","lines":["a"],"id":26}],[{"start":{"row":14,"column":46},"end":{"row":14,"column":47},"action":"remove","lines":["\""],"id":27},{"start":{"row":14,"column":45},"end":{"row":14,"column":46},"action":"remove","lines":["a"]},{"start":{"row":14,"column":44},"end":{"row":14,"column":45},"action":"remove","lines":["\""]},{"start":{"row":14,"column":43},"end":{"row":14,"column":44},"action":"remove","lines":["+"]}],[{"start":{"row":14,"column":43},"end":{"row":14,"column":44},"action":"insert","lines":["+"],"id":28}],[{"start":{"row":14,"column":44},"end":{"row":14,"column":46},"action":"insert","lines":["\"\""],"id":29}],[{"start":{"row":14,"column":45},"end":{"row":14,"column":46},"action":"insert","lines":["a"],"id":30}],[{"start":{"row":14,"column":46},"end":{"row":14,"column":47},"action":"remove","lines":["\""],"id":31},{"start":{"row":14,"column":45},"end":{"row":14,"column":46},"action":"remove","lines":["a"]},{"start":{"row":14,"column":44},"end":{"row":14,"column":45},"action":"remove","lines":["\""]},{"start":{"row":14,"column":43},"end":{"row":14,"column":44},"action":"remove","lines":["+"]}],[{"start":{"row":33,"column":0},"end":{"row":33,"column":1},"action":"insert","lines":[" "],"id":32}],[{"start":{"row":33,"column":0},"end":{"row":33,"column":1},"action":"remove","lines":[" "],"id":33}],[{"start":{"row":33,"column":0},"end":{"row":34,"column":0},"action":"insert","lines":["",""],"id":34}],[{"start":{"row":34,"column":0},"end":{"row":40,"column":3},"action":"insert","lines":["apiRouter.use((req, res, next) => {","  if (req.user) {","    console.log(\"User is set:\", req.user);","  }","","  next();","});"],"id":35}],[{"start":{"row":40,"column":3},"end":{"row":41,"column":0},"action":"insert","lines":["",""],"id":36}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":0,"column":0},"end":{"row":0,"column":36},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":32,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1674246866965,"hash":"81e681df03c2801fdf80de0aa5427e099a623d7a"}