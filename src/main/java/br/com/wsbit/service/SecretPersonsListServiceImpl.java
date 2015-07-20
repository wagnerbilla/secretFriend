package br.com.wsbit.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.wsbit.model.Person;
import br.com.wsbit.repository.PersonRepository;

@Service
public class SecretPersonsListServiceImpl implements SecretPersonsListService {

	@Autowired
	PersonRepository personRepository;

	@Override
	public void doShuffle() {
		System.out.println("doShuffle() called !!!");

		ArrayList<Person> persons = (ArrayList<Person>) personRepository.findAll();
		ArrayList<Person> shuffledPersons = new ArrayList<Person>();

		do {
			shuffledPersons.clear();
			shuffledPersons = (ArrayList<Person>) cloneList(persons);
			Collections.shuffle(shuffledPersons);
		} while (!checkShuffleConsistenceIsOk(persons, shuffledPersons));

		associatePersonAndSecretPerson(persons, shuffledPersons);

		personRepository.save(persons);
	}

	@Override
	public void clearShuffle() {
		System.out.println("clearSecretFriendsAssociation() called !!!");

		ArrayList<Person> persons = (ArrayList<Person>) personRepository.findAll();
		
		for (Person person : persons) {
			person.setSecretFriend(null);
		}
		
		personRepository.save(persons);
	}
	
	@Override
	public void sendEmails() {
		System.out.println("sendEmails() called !!!");
		
		ArrayList<Person> persons = (ArrayList<Person>) personRepository.findAll();
		
		if ((persons == null) || (persons.size()==0)) return;

	      String from = "secretFriend@no-reply.com";
	      String host = "localhost";
	      Properties properties = System.getProperties();

	      properties.setProperty("mail.smtp.host", host);
	      Session session = Session.getDefaultInstance(properties);

	      try{
	    	  
	         for (Person person : persons) {
			     MimeMessage message = new MimeMessage(session);
			     message.setFrom(new InternetAddress(from));
		         //message.setSubject("Here goes your Secret Friend");
			     message.setSubject("Your Secret Friend is: " + person.getSecretFriend().getName() + "( " + person.getSecretFriend().getEmail() + " )");
	        	 String to = person.getEmail();
		         message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
		         message.setText("Your Secret Friend is: " + person.getSecretFriend().getName() + "( " + person.getSecretFriend().getEmail() + " )");
	
		         // Send the message
		         Transport.send(message);
	         }
	         
	         System.out.println("Messages sent successfully ....");
	      }catch (MessagingException mex) {
	         mex.printStackTrace();
	      }
	
	}

	private List<Person> cloneList(List<Person> list) {
		List<Person> clone = new ArrayList<Person>(list.size());
		for (Person person : list)
			clone.add(person.clone());
		return clone;
	}

	private boolean checkShuffleConsistenceIsOk(List<Person> persons, List<Person> shuffledPersons) {
		for (int index = 0; index < persons.size(); index++) {
			if (persons.get(index).getId() == shuffledPersons.get(index).getId())
				return false;
		}
		return true;
	}

	private void associatePersonAndSecretPerson(List<Person> persons, List<Person> shuffledPersons) {
		for (int index = 0; index < persons.size(); index++) {
			persons.get(index).setSecretFriend(shuffledPersons.get(index));
		}
	}

}