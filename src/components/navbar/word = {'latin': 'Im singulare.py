word = {'latin': 'Im singulare. Non sum normalem', 'korean':'나는 특별하다. 나는 평범하지 않다.'}

wordonpage = word.get('latin')

print(wordonpage)

def words(mouseover):
    if mouseover == True:
        wordonpage = word[1]
    else:
        wordonpage = word[0]


        