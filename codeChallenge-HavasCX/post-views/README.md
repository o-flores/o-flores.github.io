Este projeto foi feito para o desafio de estágio da Havas CX. Utilizando React, criei a aplicação que faz uma chamada à API https://jsonplaceholder.typicode.com/posts e retorna todos os posts na página inicial e ao clicar em algum deles leva o usuário a outra página com mais detalhes. 

A aplicação pode ser acessada pela seguinte URL: https://post-views.vercel.app/

Meus maiores desafios neste projeto foram:
1. Atualização de estados a partir da chamada assíncrona de uma API para que todos os posts fossem renderizados na tela principal;
2. Utilização de estados para alterar os post a serem mostrados tanto na barra de pesquisa, quanto na seção "Leia mais" da segunda view;
3. CSS.

Respostas:
1. Descreva possíveis otimizações de performance que você poderia fazer no seu
próprio código: 
- No componente `Post` utilizei uma tag `a` ao inves do componente <Link> para voltar à home, pois não consegui renderizar novamente todos os posts utilizando <Link>. Numa aplicação maior, isso poderia prejudicar a performance do app;
- Utilização de estados no componente `PostDetails` para renderizar o post em questão e os posts filtrados;



2. O que você poderia ter melhorado?
- Poderia ter melhorado na organização do CSS e ter reutilizado classes em diferentes componentes;
- Poderia ter melhorado na estilização, pois acredito que ainda não esteja em um nível profissional;
- Poderia ter melhorado nas otimizações acima mencionadas;