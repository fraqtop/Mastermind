<?php
require_once('database.php');
$db_context = new Database();
$db_context->connect();
if (isset($_GET['score']))
{
    echo $db_context->checkForRecord($_GET['score']);
}
else
{
    $top_scores = $db_context->getHighscores();
    $table_body = '';
    for ($index = 0; $index<count($top_scores); $index++)
    {
        $name = $top_scores[$index]['name'];
        $points = $top_scores[$index]['points'];
        $table_body .= "<tr> <td>".strval($index+1)."</td> <td> $name</td> <td> $points</td> </tr>";
    }
    $page = <<<PAGE
<html>
<head>
    <link rel="stylesheet" href="static/style.css">
</head>
<body>
<table>
    <thead>
    <tr>
        <td>Place</td>
        <td>Name</td>
        <td>Points</td>
    </tr>
    </thead>
    <tbody>
        $table_body
    </tbody>
</table>
<a href="/">
    <div class="button">
        try again
    </div>
</a>
</body>
</html>
PAGE;
    echo($page);
}
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if (isset($_POST['player_name']))
    {
        $db_context->setRecord($_POST['player_name'], $_POST['new_record']);
    }
}
