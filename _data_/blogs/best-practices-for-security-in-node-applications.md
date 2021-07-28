---
title: Best practices for security in Node applications
date: 2021-07-15
summary: Best practices and recomendations to improve your node js app security and stay always safe.
tags:
  - backend
  - nodejs
image:
  source: https://emanuelosva-blog-images.s3.amazonaws.com/node-js-security.png
  description: (Node by GeekFlare)
author:
  name: Many Osorio
  image: /assets/author-image.png
---

There a three basic ways to implement a proper security in a node js application. The first way has to do with how we write code, the second with the measures we take to prevent the main known attacks an the third with a proper authentication flow if our application requires it.

## Security while we write code

There are some best practices that we need to follow to generate a code base with proper security:

#### Don’t expose secrets or env variables in the code

One of the most used tools to get it is the [dotenv](https://www.npmjs.com/package/dotenv) library that allow us to store secrets in a file called .env that must be ignored by git. Dotenv load the secrets in .env files as environmet variables.

#### Make use of security rules linter

[eslint-plugin-security](https://github.com/nodesecurity/eslint-plugin-security) is a eslint extension that will help us to identify potential security hotspots, but finds a lot of false positives which need triage by a human. Whatever, is a useful tool to find some security issues that can be solved during the development and not find them in production.

#### Avoid the callback hell

The advantage of the event loop in node js is lost when we execute processes with high execution cost, then use asyncronuos code always you can do it.

#### Don´t expose unnecessary routes and information

If you are currently developing an API only expose the needed routes and methods. If you manage some part of the CRUD operations only internaly, then do not expose it in your public API. In the same way, if in your data model you store more information than is necessary for the client to fulfill its function then only return what the client needs.

#### Make sure dependencies are secure

Keep dependencies free of known vulnerabilities through npm audit, or use a dedicated tool like [Snyk](https://snyk.io/).

## Protect yourself against known attacks

We can implement some practices, tools and patterns that can increase our protection against some cyber attacks.

#### Protect you against SQL injection

The request input validation is the best defense against SQL injection attacks, whether you use relational db or NoSQL. A good practices is do it through a middleware that receives as inputs: the request body and the expected schema of the request input.

Some usefull librarys are:

- [Joi](https://www.npmjs.com/package/joi)
- [Express validator](https://express-validator.github.io/docs/)
- [AJV](https://github.com/ajv-validator/ajv)

It's recommended to validate the type of data expected, as well as that the body doesn’t contain additional fields to those expected.

#### Protect you against DOS attacks

There are two important reasons to shield your application against DOS attacks. The first is that your application may be out of order, and the second is that if you use a self scaled service to host your application, the extra charge generatted by the attack will translate into a very considerable money charge.

Some ways to pretect you against DOS is through:

- Areverse proxy like [nginx](https://www.nginx.com/blog/rate-limiting-nginx/).
- Some library as [express-rate-limit](https://www.npmjs.com/package/express-rate-limit).

With which you can limit the number of requests per second allowed to your application.

#### Other Basics

The following list could be considering “the non-negotiable” points:

- Always use https. If you build something with educational porpuse is ok not work with SSL, but if you are developing a real world app is imperative you use a secure transport layer with https.

- Always add the CORS header to limit the allowed ip clients if yor application can do it. (Resource: [npm cors](https://www.npmjs.com/package/cors))

- Hide the header X-Powered-By. This header expose the technology you use to run your server application, some possible attackers can take advantange of known security issues of your stack technology. Librarys as [Helmet](https://www.npmjs.com/package/helmet) can do it for you and add some other useful security headers.

## Stay informed of what is happening

One of the most important things to launch your project to production is a robust loging system.

The reason is:

> You can’t fix or improve things you don’t know

At application level use a robust loging library and avoid use `console.log`, besides `console.log` is synchronous, other librarys have systems to store and filter logs by topics (info, error, debug, warn, ect.). Some options are:

- [Winston](https://www.npmjs.com/package/winston)
- [Pino](https://www.npmjs.com/package/pino)

And always (if you can) use a plattaform to take visualization of your logs and server statistics as: requests per second, cpu load, latency, traffic, etc. The most used tools to do it are:

- [DataDog](https://www.datadoghq.com/)
- [Sentry](https://sentry.io/welcome/)

## Conclusion

As software developers we don’t have the sole responsibility of creating great functionalities for our customers. We must remenber that our application is the core of a business and our responsibility is to take care of it, make it grow and take guarantee our users have the best service. This means that we must take the security of our appliaction very seriously, in this way we are protecting both, our business and users.
