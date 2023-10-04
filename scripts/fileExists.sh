#!/bin/bash 
echo "$1"
while [ ! -e $1 ]; do sleep 1; done

if [ -e "$1" ]; then
    echo "File found"
    python "$1"
    rm $1
else
    echo "Just kidding"
fi