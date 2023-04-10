# this is just to init folders 

from os.path import join
import json


# get parent dir , join with "topics"
# foreach topic create a topic.json with {"subtopic 1" : {"question":"answer"}, "subtopic 2" ... }
# so get subtopics by parsing json

path = join("resources", "subjects","AQA","Biology","Biology.json")