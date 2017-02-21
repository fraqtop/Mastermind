<?php
declare (strict_types = 1);

class Database{
    private $host = "localhost";
    private $db_name = "bd";
    private $login = "login";
    private $pass = "password";
    private $context;
    public function connect()
    {
        $dsn = "mysql:host=$this->host;dbname=$this->db_name";
        $this->context = new PDO($dsn, $this->login, $this->pass);
    }
    public function getHighscores()
    {
        $result = $this->context->query("select name, points from Record order by points ASC LIMIT 5");
        return $result->fetchAll();
    }
    public function checkForRecord($result)
    {
        $records = $this->getHighscores();
        if (count($records)<5)
        {
            return true;
        }
        return $records[4]['points'] > $result;
    }
    public function setRecord(string $name, int $points)
    {
        $statement = $this->context->prepare('insert into Record(name, points) VALUES (?, ?)');
        $statement->execute(array($name, $points));
    }
}