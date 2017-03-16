<?php
declare (strict_types = 1);

class Database{
    private $host = "localhost";
    private $db_name = "db";
    private $login = "secure";
    private $pass = "secure";
    private $context;
    public function connect()
    {
        $dsn = "mysql:host=$this->host;dbname=$this->db_name";
        $this->context = new PDO($dsn, $this->login, $this->pass);
    }
    public function getHighscores()
    {
        $result = $this->context->query("select name, points from Record order by points ASC LIMIT 10");
        return $result->fetchAll();
    }
    public function checkForRecord($result)
    {
        $records = $this->getHighscores();
        if (count($records)<10)
        {
            return true;
        }
        return $records[count($records-1)]['points'] > $result;
    }
    public function setRecord(string $name, int $points)
    {
        $statement = $this->context->prepare('insert into Record(name, points) VALUES (?, ?)');
        $statement->execute(array($name, $points));
    }
}