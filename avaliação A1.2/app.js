/* Criando aplicação angular */
var app = angular.module('minhaApp', []);

/* Declarando um controller para nossa aplicação */
app.controller('meuController', meuController);

/* Criando a função que será executada pelo controller */
function meuController($scope, $http) {
  //Declara uma variável scope chamada title
  $scope.title = 'Seja bem vindo.';
  $scope.caminhoPoster = 'https://image.tmdb.org/t/p/w300';
  $scope.caminhoFoto = 'https://image.tmdb.org/t/p/original';
  $scope.caminhoPesquisa = 'https://developers.themoviedb.org/3/search/search-movies';

  //Declara uma variável para a lista de filmes de ação
  $scope.acao = [];

  //Declara uma variável para a lista de filmes de comédia
  $scope.comedia = [];

  //Declara uma variável para a lista de filmes de romance
  $scope.romance = [];

  //Declara uma variável para receber UM filme por vez
  $scope.filme = {};

  //Declara uma variável que receberá o nome do filme digitado pelo usuário
  $scope.tituloFilme = '';

  $scope.procurarFilmes = function(){
    $http
    .get(
      'https://api.themoviedb.org/3/discover/movie/search/movie?with_genres=28&language=pt-BR&api_key=a1b35736a79583a39fef33408f7e1799'
    )
    .success(function (dados){
      $scope.tituloFilme = dados;
    });
  };

  $scope.buscarFilme = function (codigo) {
      $http
        .get(
          'https://api.themoviedb.org/3/movie/'+codigo+'?&language=pt-BR&api_key=a1b35736a79583a39fef33408f7e1799'
        )
        .success(function (dados) {
          $scope.filme = dados;
        });
    };

  $scope.buscarFilmesAcao = function () {
    $http
      .get(
        'https://api.themoviedb.org/3/discover/movie?with_genres=28&language=pt-BR&api_key=a1b35736a79583a39fef33408f7e1799'
      )
      .success(function (dados) {
        $scope.acao = dados.results;
      });
  };

  $scope.buscarFilmesComedia = function () {
    $http
      .get(
        'https://api.themoviedb.org/3/discover/movie?with_genres=35&language=pt-BR&api_key=a1b35736a79583a39fef33408f7e1799'
      )
      .success(function (dados) {
        $scope.comedia = dados.results;
      });
  };

  $scope.buscarFilmesRomance = function () {
    $http
      .get(
        'https://api.themoviedb.org/3/discover/movie?with_genres=10749&language=pt-BR&api_key=a1b35736a79583a39fef33408f7e1799'
      )
      .success(function (dados) {
        $scope.romance = dados.results;
      });
  };

  $scope.carregarDados = function (){
      $scope.buscarFilmesAcao();
      $scope.buscarFilmesComedia();
      $scope.buscarFilmesRomance();
      $scope.buscarFilme(451048);
      $scope.procurarFilmes();
  };
}
