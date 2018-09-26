import os
import sys
import json


def update_json_file(url):
    full_path = os.path.abspath('services/swagger/swagger.json')
    with open(full_path, 'r') as file:
        text = file.read()
        data = json.loads(text)

    data['servers'][0]['url'] = url
    with open(full_path, 'w') as outfile:
        json.dump(data, outfile)
    return True


if __name__ == '__main__':
    try:
        update_json_file(sys.argv[1])
    except IndexError:
        print("Please provide a url.")
        print("USAGE: python update-spec.py URL")
        sys.exit()
