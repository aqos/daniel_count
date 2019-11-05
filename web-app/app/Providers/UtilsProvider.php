<?php
namespace App\Providers;

class UtilsProvider
{
    public function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function getCsvAsAssociativeArray($filePath)
    {
        $formatedData = array();
        $keys = array();
        $index = 0;
        $handle = fopen($filePath, "r");
        while (($data = fgetcsv($handle)) !== FALSE) {
            if ($index == 0) {
                $keys = $data;
                $index++;
            }
            else {
                if (($return = $this->constructAssociativeArray($data, $keys, [4], [5, 6]))) {
                    $formatedData = array_merge($formatedData, array($return));
                } else {
                    break;
                }
            }
        }
        return $formatedData;
    }

    public function constructAssociativeArray($data, $keys, $floatIndexes = [], $intIndexes = [])
    {
        if (count($keys) != count($data)) {
            return false;
        }
        $associativeArray = [];
        foreach ($data as $key => $value) {
            if (array_search($key, $floatIndexes) !== FALSE) {
                $associativeArray = array_merge(
                    $associativeArray, 
                    [$keys[$key] => $this->getfloat($value)]
                );
            } elseif (array_search($key, $intIndexes) !== FALSE) {
                $associativeArray = array_merge(
                    $associativeArray, 
                    [$keys[$key] => intval($value)]
                );
            } else {
                $associativeArray = array_merge(
                    $associativeArray, 
                    [$keys[$key] => $value]
                );
            }
        }
        return $associativeArray;
    }

    public function getfloat($str)
    {
        if (strstr($str, ",")) {
            $str = str_replace(".", "", $str); // replace dots (thousand seps) with blancs
            $str = str_replace(",", ".", $str); // replace ',' with '.'
        }

        if (preg_match("#([0-9\.]+)#", $str, $match)) { // search for number that may contain '.'
            return floatval($match[0]);
        } else {
            return floatval($str); // take some last chances with floatval
        }
    }
}
