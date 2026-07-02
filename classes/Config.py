import json
from .. import constants


class Config:

    def __init__(self):
        self._filename = '{0}/config.json'.format(constants.DATA_DIR)
        self.server = None
        self.username = None
        self.password = None
        self.token = None

    def to_dict(self):

        return self.__dict__

    def to_json(self):
        json_str = json.dumps(self.to_dict())

        return json_str

    def save(self):
        with open(self._filename, 'w') as file:
            print('SAVING CONFIG: ', self.to_json())
            #json.dump(self.to_json(), file)
            file.write(self.to_json())

    @staticmethod
    def get_instance():
        obj = Config()
        data = None
        with open(obj._filename, 'r') as file:
            data = json.load(file)
        print("JSON DATA", data)

        if data is None:
            return obj

        obj.server = data.get('server', '')
        obj.username = data.get('username', '')
        obj.password = data.get('password', '')
        obj.token = data.get('token', '')

        return obj
