# Exercício de Casa 🏠 

## Atividade para casa

A atividade será criar uma nova rota no models de tarefas.js, fazer todas as etapas de autenticação no passo a passo acima. A Schema de tarefas será na seguinte estrutura:

```
    id : { type : Number},
    descricao: { type: String },
    dataInclusao: { type: String },
    concluido: { type: Boolean },
    nomeColaboradora: { type: String }
    password: { type: String }
```

Apenas a rota getAll, será necessária. O objetivo é de testar no postman trazer todas as listas de tarefas com a autenticação reconhecendo o header.

Faça o fork desse repositório e clone na sua máquina, crie uma branch, após as alterações, realize o pull request e siga o procedimento de registro de atividade. 

--------------------------------------------------------------------------------------------------------
Terminou o exercício? Dá uma olhada nessa checklist e confere se tá tudo certinho, combinado?!

- [ ] Fiz o fork do repositório.
- [ ] Clonei o fork na minha máquina (`git clone url-do-meu-fork`).
- [ ] Resolvi o exercício.
- [ ] Adicionei as mudanças. (`git add .` para adicionar todos os arquivos, ou `git add nome_do_arquivo` para adicionar um arquivo específico)
- [ ] Commitei a cada mudança significativa ou na finalização do exercício (`git commit -m "Mensagem do commit"`)
- [ ] Pushei os commits na minha branch (`git push origin nome-da-branch`)
- [ ] Criei um Pull Request seguindo as orientaçoes que estao nesse [documento](/exercicios/para-casa/instrucoes-pull-request.md).