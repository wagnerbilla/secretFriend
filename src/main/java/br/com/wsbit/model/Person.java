package br.com.wsbit.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Person implements Cloneable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column
	private String name;

	@Column
	private String email;

	@OneToOne
	private Person secretFriend;

	@Column
	private String secretFriendName;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Person getSecretFriend() {
		return secretFriend;
	}

	public void setSecretFriend(Person secretFriend) {
		this.secretFriend = secretFriend;
		if (secretFriend != null)
		  this.secretFriendName = secretFriend.getName();
	}

	public String getSecretFriendName() {
		return secretFriendName;
	}

	public void setSecretFriendName(String secretFriendName) {
		this.secretFriendName = secretFriendName;
	}

	@Override
	public Person clone() {
		try {
			return (Person) super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
	}

}