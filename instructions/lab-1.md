# **Sigurnost računala i podataka - Lab 1**

<!-- markdownlint-disable MD007 -->
<!-- TOC -->

- [**Sigurnost računala i podataka - Lab 1**](#sigurnost-ra%C4%8Dunala-i-podataka---lab-1)
    - [Python crash course](#python-crash-course)
        - [Instaliranje virtualnog okruženja](#instaliranje-virtualnog-okru%C5%BEenja)
        - [Python basics](#python-basics)
            - [Hello, World](#hello-world)
            - [Functions](#functions)
        - [Python modules](#python-modules)
            - [Kreiranje jednostavnog modula](#kreiranje-jednostavnog-modula)
            - [Moduli kao Python skripte ili što predstavlja `if __name__ == '__main__':`](#moduli-kao-python-skripte-ili-%C5%A1to-predstavlja-if-name--main)
        - [Python packages](#python-packages)
            - [Package manager `pip`](#package-manager-pip)
            - [`pip` and Requirements file](#pip-and-requirements-file)

<!-- /TOC -->
<!-- markdownlint-disable MD007-->

## Python crash course

U okviru uvodne vježbe student će postaviti i testirati (virtualno) okruženje za razvoj Python aplikacija. Također će se upoznati s važnim konceptima Python jezika (relevantnim za laboratorijske vježbe) kao što su definicija funkcija, upravljanje modulima i paketima, rad sa stringovima i dr.

### Instaliranje virtualnog okruženja

Virtualna okruženja koriste se _izolaciju_ Python projekata u vlastita okruženja. Izoliranjem projekata u vlastita virtualna okruženja izbjegavate potencijalne konfliktne zahtjeve različitih projekata.

Npr., ako projekt A koristi jednu verziju odgovarajućeg modula ili paketa (npr. `cryptography 1.8`) a projekt B drugu verziju (npr. `cryptography 2.3`) tog modula, nije moguće istovremeno zadovoljiti oba zahtjeva ukoliko aplikacije dijele isto okruženje; globalno možete instalirati samo jednu ili drugu verziju paketa `cryptography`. S druge strane, izoliranjem projekata u vlastita okruženja, možete istovremeno zadovoljiti zahtjeve oba projekta.

U okviru labova, student će kreirati vlastito virtualno okruženje kako je prikazano u nastavku.

1. Provjerite imate li instaliran Python 3 na vašem računalu; u terminalu izvršite `python --version`. Predlažemo da koristite terminal unutar editora _Visual Studio Code_ (VSC).

   **VAŽNO:** U VSC editoru postavite `cmd` terminal kao zadani terminal (_default shell_), umjesto `powershell` terminala. Kako to napraviti? [Stack Overflow](https://stackoverflow.com/a/43751743).

2. U terminalu uđite u direktorij u kojem ćete kreirati virtualno okruženje za svoj projekt. Predlažemo da svi studenti kreiraju okruženja u direktoriju: **`C:\Users\A507\SRP`**.

3. Uđite u navedeni direktorij (ili ga kreirajte ako ne postoji) i kreirajte vlastito virtualno okruženje izvršavanjem naredbe u nastvaku.

   **VAŽNO:** Virtualno okruženje nazovite svojim imenom, npr. `mcagalj`.

   ```bash
   C:\Users\A507\SRP>python -m venv mcagalj
   ```

4. Kreirano virtualno okruženje možete aktivirati ulaskom u direktorij `C:\Users\A507\SRP\<ime_okruženja>\Scripts` i pokretanjem skripte `activate`. Za deaktiviranje okruženja koristite skriptu `deactivate`.

5. Aktiviranjem vašeg virtualnog okruženja _command prompt_ se mijenja kako je prikazano u nastavku (naravno, vaše okruženje nosi drugačije ime):

   ```bash
   (mcagalj) C:\Users\A507\SRP>mcagalj
   ```

Čestitamo na uspješno postavljenom virtualnom okruženju!

### Python basics

#### Hello, World

```python
print("Hello, FESB!")

# This is a comment

'''
This a multiline comment.
Let us define a variable name.
'''
name = "FESB"
print("Hello, {}".format(name))
print(f"Hello, {name}!")
```

#### Functions

1. Simple one

   ```python
   def hello(name):
       """ Say hello to name """
       print(f"Hello, {name}!")

   # Let us call the function
   hello("FESB")
   ```

2. Playing with arguments

   ```python
   def say(**args):
       """ Function with keyword arguments (kwargs) """
       what = args.get('what', 'Hello')
       name = args.get('name', 'Nobody')
       print(f"{what}, {name}!")

   # Let us test the function
   say(what="Hello", name="FESB")
   say(what="Hi", name="FESB")
   say(name="FESB", what="Hi")
   say(name="FESB")
   say(what="Hi")
   say()

   # ** unpacks dictionaries
   my_dicionary = {'what': 'Hi', 'name': 'FESB'}
   say(**my_dicionary)
   ```

3. Return something

   ```python
   def encrypt(plaintext, **params):
       key = params.get('key')
       assert key, 'Encryption key is missing'

       mode = params.get('mode')
       assert mode, 'Encryption mode is missing'

       cipher = Cipher(CIPHER(key), mode, backend=default_backend())
       encryptor = cipher.encryptor()
       ciphertext = encryptor.update(plaintext)
       ciphertext += encryptor.finalize()
       return ciphertext
   ```

### Python modules

#### Kreiranje jednostavnog modula

Pohranimo prethodne funkcije u datoteku `speak.py`:

```python
# File "speak.py"
def hello(name):
    """ Function hello """
    ...

def say(**args):
    """ Function say """
    ...

# Constant
DEFAULT_NAME = "FESB"
```

Kreirajmo novu datoteku `speak_FESB.py` (u istom direktoriju kao i `speak.py`):

```python
# File "speak_FESB.py"
# Import functions from module "speak"
import speak

# Let's test the imported functions
speak.hello("FESB")
speak.say(name="FESB")
```

```python
# File "speak_FESB.py"
# Here we import only one function
from speak import say

say(name="FESB")
```

```python
# File "speak_FESB.py"
# We can even rename an imported function
from speak import say as reci

reci(name="FESB")
```

```python
# File "speak_FESB.py"
# Importing a constant
from speak import DEFAULT_NAME
from speak import say
'''
Alternatively we can do the following:
    from speak import say, DEFAULT_NAME
or
    from speak import (
        say,
        DEFAULT_NAME
    )

'''

say(name=DEFAULT_NAME)
```

#### Moduli kao Python skripte ili što predstavlja `if __name__ == '__main__':`

U prethodnom primjeru smo kreirali modul `speak` s ciljem korištenja istog unutar drugih Python skripti. Python moduli su zapravo samo obične Python skripte pa ih kao takve možemo i izravno pozivati/izvršavati (ne moramo ih nužno uvoditi u posebnu skriptu - `import speak`). Dakle, pozivanje modula kao skripte kako je prikazano u nastavku sasvim je legitimno u Pythonu.

```shell
python speak.py
```

Često u modulima možemo naći sljedeći kondicionalni izraz: `if __name__ == '__main__':`. Definirajmo modul `speak` kako slijedi:

```python
# File "speak.py"
def hello(name="FESB"):
    """ Say hello to name (defaults to FESB) """
    print(f"Hello, {name}!")

# This function is executed in all cases
hello(__name__)


if __name__ == '__main__':
    # This part is executed only if the script
    # is called directly (i.e., python speak.py)
    hello(__name__)
    hello()
```

Kada modul koristite izravno kao samostalnu skriptu, odnosno kada ga pozivate kao `python speak.py`, Python interpreter postavlja specijalnu varijablu `__name__` u vrijednost `__main__`. S druge strane, kada isti modul uvozite u drugu skriptu, vrijednost varijable `__name__` postaje ime tog modula. Na ovaj način znate je li modul korište izravno ili je uvezen u drugu skriptu i shodno tome možete izvršiti ili ne izvršiti odgovarajuću logiku. Ovo je npr. korisno kada radite testove za modul. Testove naravno ne želite izvršavati prilikom korištenja modula unutar drugih skripti.

Usporedite rezultate izvršavanja Python skripti u nastavku.

1. Izravan poziv modula

   ```shell
   python speak.py
   ```

2. Posredno korištenje modula (`import <module_name>`)

   ```python
   # File "speak_FESB.py"
   # Import "hello" function from module "speak"
   from speak import hello

   # Use hello function
   hello("FESB")
   ```

   ```shell
   python speak_FESB.py
   ```

### Python packages

Python paketi (eng. _package_) služe za grupiranje i strukturiranje više povezanih modula u jednu cjelinu. U osnovi, Python paket je skup datoteka pohranjenih i organiziranih u zajednički direktorij. Standardna Python-ova biblioteka ([_The Python Standard Library_](https://docs.python.org/3/library/)) uključuje brojne korisne module i pakete koji su pisani u C ili Python jeziku.

Module i pakete koji nisu dio standardne biblioteke možete instalirati pomoću odgovarajućih upravitelja paketima. Popularan alat za instalaciju Python paketa je `pip`, a popularan repozitorij s Python paketima je [Python Package Index (PyPI)](https://pypi.org/).

#### Package manager `pip`

U okviru laboratorijskih vježbi, za potrebe rada s kriptografskim primitivima (enkripcijskim algoritmima, kriptografskim _hash_ funkcijama, i dr.) koristiti ćemo Python paket [`cryptography`](https://pypi.org/project/cryptography/).

Tragom toga, pokušajte izvršiti sljedeću Python skriptu unutar vlastitog virtualnog okruženja; ne zamarajte se za sada činjenicom da ne znate čemu služe moduli koje uvozimo u skriptu:

```python
# File package_test.py

from cryptography.fernet import Fernet
'''
Importing the class "Fernet" from the package "cryptography",
the subpackage "fernet"; recall, (sub)packages are just ordinary
folders. You can easily verify this by looking here:
https://github.com/pyca/cryptography/tree/master/src

And yes, Python has classes and supports object-oriented
programming.
'''

# Let us now use the imported class Fernet
key = Fernet.generate_key()
f = Fernet(key)
ciphertext = f.encrypt(b"A really secret message. Not for prying eyes.")

print(f"\nCiphertext: {ciphertext}")
```

```shell
(mcagalj) C:\Your\folder>python package_test.py
Traceback (most recent call last):
  File "crypto.py", line 1, in <module>
    from cryptography.fernet import Fernet
ModuleNotFoundError: No module named 'cryptography'
```

Očigledno nemamo instaliran traženi modul/paket na lokalnom računalu, pa ga trebamo instalirati. To možemo napraviti korištenjem alata **`pip`** kako je prikazano u nastavku:

```shell
pip install cryptography
```

Ako želite više informacija o instaliranom paketu možete koristiti `pip show <ime_paketa>`. Pokušajmo ponovo izvršiti našu skriptu. Voila!

```shell
(mcagalj) C:\Your\folder>python package_test.py

Ciphertext: b'gAAAAABbtx7LWMixhxgjbpcPF7KOszxbfLuK1lwLg1PYTizsrHnCI2B8NluKaHos5WsUkKfOyjWaD80ogmBlSI8kYjo8edlyGz5wn6fin1QpirGLBDSEVSpzecqfdPCS1PgF-KHME4H3'
```

#### `pip` and Requirements file

Zamislite situaciju u kojoj u projektu koristite više vanjskih modula koje ste pojedinačno instalirali (`pip install module_A`, `pip install module_B`, ...). Želite svoj projekt poslati prijatelju koji nema instalirane potrebne module te ih treba instalirati. Ako vaš projekt koristi veliki broj paketa/modula (> 10), pojedinačna instalacija istih biti će jako destimulirajuća za vašeg prijatelja.

Upravitelj paketima **`pip`** ima rješenje za ovakve situacije. `pip` omogućava instalaciju paketa navedenih u odgovarajućoj datoteci (tzv., _requirements file_). Pretpostavite da su vaši moduli navedeni u datoteci `requirements.txt`. Izvršavanjem sljedeće naredbe pokrećete instalaciju svih potrebnih modula.

```shell
pip install -r requirements.txt
```

Ostaje pitanje kako kreirati `requirements` datoteku. `pip` ima podršku i za ovu zadaću.
Ako želite samo izlistati module/pakete koje koristite u vašem projektu izvršite:

```shell
pip freeze
```

Ako iste želite pohraniti u npr. datoteku `requirements.txt`, izvršite:

```shell
pip freeze > requirements.txt
```

_That's it for now!_
