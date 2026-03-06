---
layout: single
title: "Project: HTTP Server"
date: 2025-05-01
header:
    teaser: /assets/images/httpserver/picture.png
---

This program was written as a homework project for my Basics of Programming 2 course. The code is not optimized nor pretty since it had to meet strict deadlines. The final C++ code can be found on my GitHub.

#### Introduction

The goal of this project was to create an HTTP Server to serve static websites. I intended it to be a proof of concept, as a learning opportunity not as a production-ready software.

#### Program Interface

Makefile is currently written for MacOS and the current implementation only works on MacOS/FreeBSD because it uses kqueue.

```zsh
foo@bar:~$ make
foo@bar:~$ ./bin/main
```

#### Program Execution

![Image](/assets/images/httpserver/flow.png)

#### Program Structure

![Image](/assets/images/httpserver/request.png)
![Image](/assets/images/httpserver/response.png)
![Image](/assets/images/httpserver/tcpserver.png)
![Image](/assets/images/httpserver/utils.png)

#### Input and Output

The program uses the given resource files (html, css, images, etc...) as input files.
Output is only for debugging purposes.

#### Improvements and Extensions

Pipeline for multi-use connections, HTTPS support, cookies, caching, multithreading and proper error handling could be things that I implement next.

#### Difficulties Encountered

Time crunch was the main issue for me this time. Understanding and implementing kqueue was quite complex as well.
