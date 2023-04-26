from random import randint

list_of_fruits = ['avocado', 'banana', 'apricot', 'persimmon', 'strawberry']

i = 0
for fruit in list_of_fruits:
    print(fruit)
    if i == len(list_of_fruits) - 2:
        print(fruit[2:7])
    i += 1

multiply = 1
while multiply <= 10:
    for i in range(1, 13):
        print(f'{multiply} * {i} = {multiply*i}')
    multiply += 1

magic_number = randint(1,101)
guessed_number = None
print('Guess the magic number!')
while guessed_number != magic_number:
    try:
        guessed_number = int(input('Please pick a number from 1 - 100: ->'))
        
        if guessed_number == magic_number:
            print(f'You guessed {guessed_number}...You guessed the magic number! Congratulations!')
            break
        else:
            return_err = f'You guessed {guessed_number}...Your guess is too low' if guessed_number < magic_number else f'You guessed {guessed_number}...Your guess is too high'
            print(return_err)
    except ValueError:
        print('Invalid entry. Enter a number, please.')
    except Exception as e:
        print(f'ooops. Some unexpected error happened. {e}')