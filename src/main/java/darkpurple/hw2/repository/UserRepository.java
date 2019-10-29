/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.repository;

import darkpurple.hw2.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author edmundliang
 */
public interface UserRepository extends MongoRepository<User, String> {

    User findByEmail(String email);

}
