We need to fix the NGINX on codejedi digital ocean remote.

Follow this:

```
    TO ADD NEW LOCATIONS, FOR EXAMPLE

    codejedi.xyz/auth/signin

    Add them to sites-enabled/codejedi.xyz

    And then:

    sudo nginx -t

    sudo systemctl restart nginx
```

and try to get this route to work:

https://codejedi.xyz/users/60a42572acf5e2003a8ab427/questions
