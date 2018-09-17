import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import unittest
from project.tests.test_auth import TestAuthBlueprint
from project.tests.test_user_model import TestUserModel
from project.tests.test_config import TestDevelopmentConfig
from project.tests.test_users import TestUserService


if __name__ == "__main__":
    unittest.main()
