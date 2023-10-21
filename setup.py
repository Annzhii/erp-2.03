from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in fowerp/__init__.py
from fowerp import __version__ as version

setup(
	name="fowerp",
	version=version,
	description="fow erp",
	author="anzhi",
	author_email="anzhi@anzhi.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
