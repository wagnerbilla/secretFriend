package br.com.wsbit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.wsbit.service.SecretPersonsListService;

@Controller
@RequestMapping("/")
public class AppController {
	
  @Autowired
  SecretPersonsListService secretPersonsListService;

  @RequestMapping(method = RequestMethod.GET)
  public String viewApplication() {
    return "index";
  }

  @RequestMapping(value = "doShuffle", method = RequestMethod.GET)
  public String doShuffle() {
	secretPersonsListService.doShuffle();
    return "blank";
  }

  @RequestMapping(value = "clearShuffle", method = RequestMethod.GET)
  public String clearShuffle() {
	secretPersonsListService.clearShuffle();
    return "blank";
  }
  
  @RequestMapping(value = "sendEmails", method = RequestMethod.GET)
  public String sendEmails() {
	secretPersonsListService.sendEmails();
    return "blank";
  }
  
}