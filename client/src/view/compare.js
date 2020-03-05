import React, { Component } from "react";
import style from "../common/css.js";

import { ALL_USER_QUERY } from "../graphql/graphql.js";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import {
  Dimmer,
  Loader,
  Button,
  Grid,
  Header,
  Divider,
  Segment,
  Search
} from "semantic-ui-react";
import _ from "lodash";
import ProgressBar from "../common/progressBar";
import CardDisplay from "../common/cardDisplay";
var source = [];
const initialState = {
  isLoading: false,
  results: [],
  value: "",
  isLoading2: false,
  results2: [],
  value2: "",
  Player1: {},
  Player2: {},
  Player1Flag: false,
  Player2Flag: false,
  view: "BAR"
};

const source2 = [
  {
    title: "sachin tendulkar",
    runs: 18426,
    wickets: 154,
    catches: 140,
    matches: 463,
    century: 100,
    wicket5: 2,
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExMVFRUXFhgVFRUYFhUXFRcVFRIWFxcXFRgYHSggGB0lGxcXITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy0lICUvLi8vLS0tKy0tLS0tLS0tLS0rLS0tLS0tLS8rLS0rLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAECBwj/xABFEAABAwIEAwUFBgMGBQQDAAABAAIRAwQSITFBBVFhBiJxgZETMqGxwQcUQlLR8GKS4RUjcqLC8UNTc4KyFiQzYxc0k//EABoBAAIDAQEAAAAAAAAAAAAAAAIDAQQFAAb/xAAzEQACAQMDAQUGBgIDAAAAAAAAAQIDERIEITFBBRMyUXEiYaGxwfAUM1KB0eEVkSM08f/aAAwDAQACEQMRAD8Auvbztm6g429uQKkd9+uCRkGjTFGa80r3FSocVR73nm5xcfiurqqalR9R2r3OefFzifqtsprXpUlBWRlVKjmzllNE06S6p00VTpJoo5p0kdb01GymiaQUNkBlHJG0kHSR9AJcmCSPaIS6vbptUAhK69RDFnIGdaiEFVoBd8R4pTpD+8dhHPZJuJ8fYyMIxTzOHFyLHZtd5wplVjHllinRnPhDH2OWi4ZgBzexvOXNHzKqlx2wBjDIOYLYzmMg4aEbGOfRVStfy4hxMO2JmOX76JctT+ksQ0n6men1+JW7RJqNIz0IOYg7eIR9ANd7sGACY2xCQvEH1gCY5/so2y4q5v8AxKgzEYXEZ/TdCtRLqgnpY22Z7QLfouX2sKi8L7ZVG4MTsYbOurwdifzcivSLWo2qxtRhljgCD0P1ToVVLgrVKMociqpbKB1unFWmozSTLihLUt1GKKcOoSoalCFxwtLFG5iMqNQ7wpOBXNULgiXBQuCgkip1nMMsc5p5tJafUK/9h+3D8bbe6diDiGsqn3g46Ned50lefuCjclzpqasw4TcHdH0gsXj3/wCQLnn8Fio/hpl38TARU6KJZQRtCyRLbVaWSM4CpUEXRoIinbImnRUORxA2gttpo4UljaKDIEjosRTGrdKijaVJBJgtA4ZKDr0M07ZRVZ7d8ZbZ0cR990hnjzjdBmok06cpSsjzr7S6tQVhSxHCG4mwcpznEPwu+YVMPEHtYGGcPLx5clviPFKlVxe97iT+8oS51Searvd3NuCxikbdVnNcErlYCuONlZiWQtELjgu3q5/BNeH8cuKAwUqrmskktGbSc5MHokDHQjeHmTnsP6LuCbX2Z7B2P4/Tr0xTe6Kref4x08OSsjqK8TsLqpbup1qZgyfQjdexdm+KfebdtXKT7wyEHcRKfSqN7Mo6mjj7SJnU4QtdqY1Agq4VhMqCuqxCvaj6qFeEZwHUahno2qEJUC4kHeoXKd4UTgoJI1pdQsXHHolOiiKduFOykiKbFXchigDigF22iEUKa7bTQ5E4AzaQUjaKLZRU7aAUOZ3d3A2WyLo2qKpUwjKbEuVQbGgmBi2gEnIAST0C+cvtH40+7uHPmKbSW0m9AYlfRvaaphtKxGuAj1yhfMfGy3GYzwSDyxchzjmlKTbLdOlGKuis1jstUqROi27vO81YuzPDMTw46Az5qZyUVcZCDk7C214HVdnhPom9l2Lq1ImG/vUL0awsgQMh6Kw2XDukqlLUyfBbVCC5PMGdgnZgEdDB0hKuI9hblveaA4dMivemWAA0UFayGiFV6iOdODPmi5sH0zD2kHqFqg6OnXkve+NcCpVBDmg9dCqHxnshTYJb7s+Y6dU+GqT2Yp6d9CvC4a5rQNgrV2D4i2lVazES1/dIGjXHQnn/AFVBurc03Fs+CddnKgDXHOSdd52DeqsJ9UJnHL2We21WIKsxFcPfjoscdcIBnmAJXNVn+6vRlcxXFp2FFZqHexMKrUPUamI5C2o1DVKaZvpod1NSSLX01C6mmbqKhdQXEi/2axHfd1ig49PNJdNpImtTWqTVSuW8TKVvKIp2iJoBTteEpzY1QQL92hbFJFe0askKMmTiiJlKEQxq00KVoQthJCDt1WcywruZ7wZ3ehOQPlr5L5Wu63cidXGecRuvrXtVairaVmGYLHaa6L5EvaRa57SILXEEbggkEFTAZ0ObFkuA5kD1XofC6QaQBkF5/wAMdD2nkQvQ+HAkiAk6gs6bgt/CSrVw58JLwDh5gYgrfbWDYVKKHzaIcUqCqeac07QDRQXVgCjaFKSKpxBwVX4vGEq533DZ0KqPG7YgmUC5HxZ5dxylLstUJwxxa4GdM9onwKM49SLajhzzCj4Jw/2rwwmBiku3AzmOa0oP2SjUXtHq/wBnt+91Kox0OwkOa4kk9+ZGfUKwVjKR/Z6xgtnke9iG34Ylue6d1Vco7xMvUr2wao1DVAi301x7BPEJARauDRRzrZcezU3JsCNoKZnD5RtvSEp1Z2YOaXOpiMhC5Wf7N6LFcvubeSxK78b3KGVxbwo6QTOoyQlVcFpVeLvsPkrB9GFw8AnIpc65Kj+9IlTYOaG7qECVzTCBF/IhEWl2BqocWkSpRYaxTNQhrglE03JbQxM6fEZ6br5g+0zhQbcPqsGEPcS4HKHF7gSOhcCPEL6fc2QQdxHqvnb7Z7jDdloiGtcRnIcyoQ8H+YuIQx8QxcMonBbWXYjk1neceWeQPmrTR7TtpiWMJPPZM+2fZc2tGhZ0mkEtZVuX7ueWgBpPIHF6KvWF1ToVBSZSD6mfvGGiBMFx8EM0pvfcdBuMfIt/B/tKiA+nlpIkkeIXpXBuNNrMDmOkFeN8J7QV7qpToUregHPa9xGEtwtpsc+S+YzDeQzIRVjx51N805gHC/DJwE6SNpOSTUp24VhkJKXU9s++O5qt9pO0tSllSbjdqR9PEqWneONkyoT33RPnH6qocZFWmz2hnE+S0AOdABiTGm2Z5pUbt2DxAqnaniT35UjMaNbIE6TzQt1xa7YZr0y9hycIwuHUJVxa/wCIW9Z7aVepVmnTex9KmxzO8AXYu6YDTLecjNPqVzcmtgIFw3CD7TB7NxdhGMDZ8HKQAnSjZXshcJXdlcG472V9va/eaBxtDS8O0c2NWuVL4Re4RVgCTSeBlJxOAAw+q9u7IW4bWdRIHs6wOJp/PhO3UTPgvE+O8Cda31azgk03kN5uYRjYY3OAgxzlMotNWF1W1Lc9c+zi2P3LEWkF7yZ/CRA93oNANgrHWtiNkt7As9naU5wkgw6IO0jOJI19CrJxS/YRkrlGTsrFCvFZNsFs+Fl4lcNse/ELmjxQsGRQz7zEZlOtO7E3hZDPiVkxrctUgqNGwRzqhK1StyTkFMfZW50t3sa4falxEqx0LcNC3w+yDRJ1Q3FeIhgIGyRKTnKyHRioK7CpCxU3+2zzWI/w7A75Fy4bxCREom5AIVNt75rSCHj4j5hPra9xDUHzCGdKzugoVLqzIbsEIB7+qaXJkafBJ7mqRsEyG4uoiVjv4kXR/wAaS/2i4fhCMocSd+UInFiL2H1Bv8SZ0D1SC3v3HYJrQuCdlXnFlmlNCL7V+IVKPDKzqcS4tpmRILXuhw8xkvDuzVEXd5aUHgzTfTpxrNJtwx+AncBhqL3P7SbM1eHVgPw4ah8GOkrw3sDLeK2jt3V24v8AvaSPmFW6mlCCdLJc3+B6R2zb7TiFQ7Na2nHgCfm5KLLsc5zy9rQS7I4oOUdRl4p32haW39ad3Ajza1POFuOswqk21ItRVoIUUezbadMh9Om0DOAMUkxOvgFXOODDDcuQAAAidMtdF6Txml/cOfMYRPiAvN22z6tUOIyJkDeJyJCF8kwLjSZNs1pGWEIPhrzOAnKeep6cirRacPb7DqAkJpPp1MmhzRnG8bwUDRCkncnp8Ppzk9snUPpS71AzXTeAwcZ8jvHTkm9jfUnODXNg9UZxSGjLRHimgMmnYqzj7Oo0g5tII8ikf2l8Ha++bWbTxvdSpwBke6XmR1zHXJN3nFVA6/VM+1lPC9lSQMFLOeeIBoHUnLzTIXUXYiollG4j7NUnNo1WvGBwaA7KBiZUyMdWuCke5v8AzEbfXYZSL8iX4W+Ocz6AeqSOvQfwhaehT7u/vMzWq9X9juo4fmW6J6yhG3E7Iu0z2V2xTsxlb5p/YUQM0ptGQjn3EBVqm+yHwVt2F8T4kGNgKkcYvyRrqp+K3JJzcP5m/qkVYhx98fE/RNp01FAVJOTNe0WLr2Tfzf5StplxdjHvIylGWHEsJiUtuas7dNfqhRU6/LVTYOxeaN7I1UdeueZVc4ffbHb5J1TdPT5IcbE7s2wn8zfMfoiKdeOR8JUMDyUhpznETooFyQ0sq7Tt8U7t6jeqrlo4N8fqmFK7BMJM4XF95KI8OB7Sx2bXAtcOYIgj0Xh3DuBfdeK2YcTjbdYHAxBaC9tNw8QGn/uC9mpOXl/bi0NHitrcfhddW756e1pteD4QfUKnVji0zR0dbvFKPuuWH7QcIrteNfdPlotdn7oOyOgSn7RLhwuXt/inyhC2FzFN7gcwwkeMKlUV9zVh4bFm4txtpa8AiGyAJ947nw2XmI7ZvovGKi6WmCQ4QQDty+K1xS6eC0TloDtMZrmz4ayoZqPAHm4+OQUxglvIC8ntE9Ks/tGsvu3tA+Th/wDjOVUO/LhO/XRVqj2ou7h+TBSaTALiCAPAZkxzIC3wnstajvCuyciJY+RHz3R19Z0WjuGo/bKllpnEOnaVLUehCyuPa1zRqgD2ha9vuvGfw3BjRG8O417Vj6D4FVgkcnN2cwnUH1Gi85uQW4G4nsc73Q9jmYjEnDsckx4FWea9HOS3EJ6ZSNEGNgr9GWPhz/8A3DAfzK7do2UvZNdVBLWvacueYE8xJVFq1Q2sXjZ0q8cd79r1JpHP/qMJn4pkfC0DW8UWULtncU6b20+9nL8MjIQGjwmCVXhfN2b6n9FnbG+FW8qlsFohgjMd1ucdMUpdTC39PTwpRXuM2qspNjq1qydWjxlNqFeNwfAJBbGNkWy4hE4isSwffyBqUp4nxM8/il9e+jdKbi5xGEONiHcM+8F26JtKUoCjsmls7D/uusDiE+w8Fpb9t4LS6xFhJWfAGc+BQ3r6SpnNeY7vjkD4hafTd+XIjSCI6ZFNSG2OqVWCI1HxTu0vhA1+ngUga3Dq05jbFPgeuilZVLYOgO2vn8VONyLFqpV8iTnputG7jcxyySVlfr9QDy+KkFZro2+WXmo7sjEbU7rRNbR+85eKrtI8yI2yKKfcYRAOXjmocLi5QvsWV/FYyH7HNFezpV2RWY17QcQDgDBGYIKptOu4nX5J029wU4nM/VLnQTVhfduDTjyK/tLt5rMqDR7AR4jIhVzg9UGWHcEeqtF5U+8UHUv+JTl9IbkR3m+O6obrrA8PGkwehWPXouE3E3qFTKCuS8Rtg9jqbCGvaDhccxmdY28evRNew3FLlrG0zZW5wvwuquq4TBbhxFsaSJLgdxkNUBcEF3tBoRtqtWDvZPBxQJkS3EB08ElOysFgnyz1S14rUIH/ALa0ZGQJrtIyEEjCyfglnHOP3wBbRqWrcxDm06lQ5gzAMDLISSJknaCos+2FGmIzc7mym0TnoZXd72mZcAAUqpGoEho+CjJoFRjfcrz7OvVcLi8uDWqUxhpANDGMOEAuA3dA1TfgNENBf5frBUV134aQGxGQ8Oe67bcNADG+aW5N8hpJPYMYZcJ3PwlNvtC4q37iKYgl7miNobmZ+CrrrsDyQ3bC1qNFuHEw+m6pHIlwEHrBCuaGN60biq0k0V2kG/4VPRI3z8EO6idHSPHUrG5DIiN9V6JoqtBgrei5fdHw80IawHXads1DUf18NgTyS2gWiSvd/v6BR27855oRveJMZDy8/gi6bZ/Dpzn0HVDYBxGVIGJ2nkiqVbLWPFA0S6NMo0gmdcsytgvg93wyHohsRYL+8Hn81iiz6en9Vi6xFgCnxepyZ6H6FTDjLvyN/wAw+qBbQju4m6+pHXYLiB/t+9EaZww/tz/6/Rx+oWxx1v5D/MD9EvNDP+vwC1dWxAxYY28SOnNSErDmlxdh/C74fqjrfiFM7H0VdsaU5xijXPTqj6dEQe8ByB1Rqz5Idh99+oxH+krg3dI/iH+ZIs+vkJXeDf8AeiJRRyLJYupTIcP5v1U15Vpk5P8AiEgoCBKGuTmP16rsN+QbJsetqQZa+DMggiZBkFC9puCGtSddUG5z/f0m/mAn2jB1GZb6JC0TvHLrAVp7C13NNWm7JtWk5zJOZdSIDiB4PGf8Kpa6CdPLyLFN4vkpdjfQMJMhPLKCJkHTWefTxSHitRj6hMBr5MuGTX9XAaHqMl3Y3Dm6Qf4SQD4icisSUL7ot5W5LlbcKa46RmBl/VHNtAwYdImOg/Y+SrNPjz2CAHDoQd+X73Ql12ie7IuIGkD6fBKcJE5RHHEr3DOekien7lIW8XIl2pOQHTmllxXfUJ5Tp+qO4fwsnM/vwRKKS3IV5PYJsq1Qu9o702y0C57UcfrP9g7EXPFQtHRpAMjaARorJa8DJbLu60Cc+XVU7KpVLwO40kM/VXNFFzrLDoV9fKFOg8h7b1MVCq+sR77IyyDnYpDemEfAJe66ojT0wlF1byh7NtFzHPAcXPe1+GHEQMORBjqld5aUSP7p9V7pENNMZy4AgYXEk58tlvSum3bYy9HXpxpqEnv/ACaqX9MbH0CgfxRmzXf5f1QtSiAYxAke80ajx5KOtRjOI6TMjmkuTNG6D28Ub+Q/zD9FM3i38A83H6BAWtuYxROy69l+5+Ci4DaDncZdsxv+Y/VQVeN1Bsz+WfmUII/3MLK1tice82Sc89DllO4zCFsg6/t2r/B/IFiG+4v5U/35rEPtBXiHWtwXEy6Qe7PUzE7kBSB7QToep0JnQeKUWd0AZkHkNp680Y2+JB7w2Gg/c/qhjUFNDwVabgcLBnA72YbpEddueajYG54sLtjzmdh5x5peLiQJIB8MzvnHmpWOEEy3rO46ctE1TBCLZ4acMCDz+WR3gIhtUOP5hsCSCAOR1ynRL7giAMpGZIyG0E+hUX3kRmJ20zB5jod+vipzJGrapBznmO8fI+kIi3Ic2cUOzhsa5890poOMy3Du3PaZkGN9UXbOB1E56knYaZbo1M5sbVK0d3PMZ5hB16k5wdQehHTxUNS6kGBv1zjKfRLKt8YgCcyde6CTsUSlfgByUVdjW0plzhSAOJzgBIEy50DXTMgFILftOG8Vp3AP9xTqexYM4FuQaZIHUOL/ABPRdWN5V9q5+I9yjXeBtiFF7afjFRzD5Ks31rgaI6KtqVKaa6IKFZXRaOJYS9wGgJHodlHb2xIzkhAcLJcArJw+nCx5PE1ILIjt+DB+jiPmmFPs20bkpjw1veTw24AlVpVGM7tCOw4E3LL9FbuF8Ea2HOCh4XSzk5AJT2n7UQDSoGZ7pcNydm/qhipTdkTJqCu+Abtvx72h+6UD/wBRw5DVoVTqiIps8FM8Ci071HZuPLopLZnsm43e+fdB1E7+K9Xo9IqELdep5HW6x153XHRfUjrUwwRuBn4pfUBMxigd5xbq1jTr/NHoV1dV8iT4lccGpvxYz+IZdCPw+kjzVhvKVhEVhHIx95cgDE721P8AD7RrazY/hFQHD5QpKN9QflUoYetN7h6tfi9AQELRbSFR7MT2GZpnVrTyI3H6KeyzJa6jO+Jkz4gIFQi39/Qsuu4q6v8AL+mMX21JwHsqoB2a8YD5nMFQ3VP2eE1GADQAaE88QyJOW85KdvDC5uKmRUbyHvDoQoGFzJEkbFp08HNOR81MtMugun2jK/R/B/f7Ctz2yNG8iNAZmD4aKC6uS1wwuho7sjmI03EhOHU2H8OHqzIfynIeUJbfcKeTLCHDWBIIz1jbynyVSrQqRVy/R1tKbtLb1AvvD/8AmH/+bf0WIb2NTn/np/qtKrk/Iu5R818DRq5T9EVSuSQNMhBMDNL1LSdCQpWOY1bU/i+Gvgp21o5Hy2I0Sxjwp2PCapi2Firnnn02hcPqQZ56wowQu2MnICZ2Akk9AiUmRdIkFwNZEek8iiTe02jvQDtol1YlhwnIjUCCfPZvhr4LVrRD3wGxzcTJVqlSb8Tt7uv36iZ1lFDnhmF0ue4MYMmtIJxePRR8fvIbMUuTS3X0Gq4u7kSGUxMZTsPDn4pW5he874ch47lX3NQjjFGYoupU7yb/AGJuCEudcSSYtX6/9SmT8AuONUAKIcNZHzUHDqns3gzk4OY7q2oIn5FG1yalIsPKPMf1VbepGV+WWpyxnCS4TFvBq0FXnhtHE3JUnhtqWkE6HXor92YMtw8tF5yueko8DCxs34tE3fhpiajvJRtkTsq3eXQEuqPAHMn4BVF7TLHHIbxrjZLSB3Wchq7kP6JPTYWjG4d8+638o/VR2jxUd7U5hvuNkHP8xjdTPqDVy9N2folRj3k/E/h/Z5btPX99LuqfhXPv/ogpUQJq1NNQOZQdSo+s/IEnYDYKch1d8DJo32HhzKa29s1sMbkPxO3jckrR8XHBlt4bvn5Cqnwp7gBlJ7xzyDQe7Pic/IKS7tfYQcffOgHLm7mE6tXdw1Izd3gDsD7gPLuwY6pXWouc/E+Bvn/5O5dB4I1FJCe8lKVnwIb+yquqGr7MhgjEQZAMb7haYXNq03NcROeWm6bXt7jimzKm3Pq4/md+iHZbjECBpkErHfbzLSqvG0l0t+w6s20qjpc40as++MmnxjRMq9Go0RXpiszao3MgeI0+CXWduRqNf0Tjh9y6lk0yNS0+7nr4JzUnujIrR32+/R8oAqdnm1Bit3h3Nh1H6eaR17VzDDmlrhsRBCvtO3p1TipH2VUbDQ/qFldjKv8AdXLcL/wv5+BS82vvf+wKepnB2e6+K/koPtan53/zFYrl/wCkG/8AM/y/1WKe9h5jvxlH7R422iV0KXj6I5lPqpWWwOruWxXmLnssgBlMoljUQ208VPTtTLRGbiQCcmiBJJ8AmQTk7IXKairs5tLQuJzAaBLnH3WjmfoNSdF1W4gGgtogtGhef/kd5j3R0HxUN5ehwwMyps05udGb3cydByCHpNyHUrUpUlH1Kc5uXJplAoy3pkA7T8v381K1q6AVuNNIqzqNmmUwAtuEiBlM+QAkn0+i6pawhbniDGF1MscZEYmuAIGuGCFM3GK3AipSdluLq+cnzQLeKuDh+We9zKMrUH1MmtwtPM7dShDw1wcWZTE/JUKrqXvA1Kfd2tMu/Z63p1XFoykBzZ3EAE+v0VrteAVKDg8QRyXnnZa8fScARnRONvWmcns9JIXsj7iWiNCJHgRIWRr4uM8+kvn1NTQ1E4Yfp+XRg3aOBTa5u4zVC4oyXMgx3X9Y93PPyHmrXxZ7nZbfBVG+qk1SBs0NG+bjiOW+WBD2bDLUR/2T2lPDSy/18RVX4bXfUAo1S0huKo6AGtn3QYGZ3jqEPUqXzKnshUD9ILmtgkjwVucwUaMuEDXDqS78zzuemyA4JbkuNd+rpwTy3d4DQL1DoJvZu7974PIx1TxbaTS2V0t2DV769o4GltuQQZ7sDLXRNLV1Z7QXNpBrxHdx4sJyOp3CALTc14HujKeTBqfP6hWOoWsGLYCGjw0COFNXbu7CK1SySssvccV3AQ2YAzcUhv6+Mw2Q34lTVnPqH49B1Kge0DIeZ5pkncGlHHd8g9OnGQTfhVpJkoS1oSVYqDAxsrox6g1qm1kd1aYOSjazCY1UlHdx/fP99FGHzKMqryJWndNbe8bUHs63k796FJi5adUUSipAyhkPv7E/+13781tV/wC9H8x9SsSsJ/q+AHdVP1fAqzOG8wTucxHjkiKHCsQ7u3731Ta2ayAJMjbIN0OufzWPtY9wwBMknKPr69dl5DM9wKn8IgTntoNZPX5JF2kvgKns2aU2YZ5uLhJ+afdob32TWBru8XYnHEcsLe7lt3oO+iqTKWL206gZei1NHF4ZLl/Qr1Gst+F/4QWubHeITKg3JqXWQ7rh4fVMqHuhX9P4V99ROo5fr9AglbauHroFWynY6dkZXFxbNMPjPdSahbpHYrmk+SE2uCNoQ76cVGnmIUzsiiLijLQRq0h3lv8ABDJXXoGpWfqDVqBY9lRv4TDhzadR6L0fs/cF9u0bslnjhMCfKFUTbhzCOYn01+CsnYgzipndocP+3un/AErM7UoXpZLo7/T+C/2Vqf8AlxfXb6/yGX/uk9M/kqXRqEF1WM3OOHoNAfGAPRXHtK/2dB3Mw0H/ABGBr5nyVQo0vaxqKbcmjQkeP1SOxqO8qn7L6j+3K/sxp9OX9AypFYNxSGM2ky48vM+g8coeKXZAwD33CCB+BmwHiiLiqGAQBP4G7eJWcGsc/bPzJMtnc/m8OS9A10XJ5lSSWT4XCDODWHsmS7JzhLv4Ry/VR3L8ZnYaKS7ucRwN/wC49eSiqOAEKelkKV28pcsGrGBHr1/ohmslSPMlT2tGSoG3sg7hltuprupLgBt81O3uMlL6bpdPLPz/AH8kT8isvabkTXdfCIUFCpkg7urJU9M6LrjMLIOLlFUK0HLl7lIKRxiWlxKxCMsD1XOBdTOGWvc10kNgsJkaTqDup2XBYACWwdDhc+DqBEznEK5/aH2QqY3XNu3E1xxVGAEua/d7QPenUj9V5rVvgGOmSWtdOe7QctSdRELxLi72PXSjZiXjd0ape7IDYAQIaY08ZPmobF/fPJ7AfMf7n0XLhk5vJg+SCs6xgHdhny3XoYpU8UuhTtnGX36BFlkSPEeiZWunmf1+qWhwFU8jn5FMbM5kefom6d228hWoV9yXULVNy27Irh4gyNFaexWW5O0rbhuuGldgohZzVzHVE8MqBwhDLikSx4cNChezuS1eNiy0md3LbNM+ypw3IGxa8DzLHf6SgLIy2UXw5xZWYQYh/wAHAtM+qDWQyoSXuFaKphqY38wnts7HWp0tWtaajh1dLGfD2nqEsrEMaCdT7rVJeXgqVH1T+J3dESYADWwPABc29kXOx1PJp5df0Q6Cl3VCMer3/wBk9pV1W1MpN7LZfsQWlpjOOpp136Doirm4JENyGnX+inrZ5bBA1DmQrdrFJPJ3ZlIABRVXyu3lDlQEvM2wSm1jThL7diaUSiiLqvoZf1MgPNAY4aeq7vauaCfUUN7kwh7JFUdn5othzQE95G0zmoQ2SCS5cF65qOVr7FdlKlZ7a1ZpbRaQ4Bwg1CMxAP4eu6CrVjSjlImjQlVkoxQv/wDS1x+Q+ixeywsWN/lKnkjd/wARS82bXiX2w++7y/8AJixYs2PiXqjSq+E80/4jv8Df9SW2fvH/AAlYsW3U8S9WZ1Pwv0R0Peb/AIQnFv7w81ixdp/EwdR4UE1dFGdB4rFivsoo6pLtbWLlwQ+THLl2nmPmsWLnwQixcI9wI1vvFYsU1fypej+RTp/9heq+ZFZaN8EcFixOh4UVa35j9SJ6Wt18z81tYokMp8Mx6iWliFjEF0EdTWLESEzF95r++aEKxYhY6PBA33vL6hHUltYuRMywdkv/ANhniPmvZAsWLD7U/MXob3ZH5T9TaxYsWYax/9k="
  },
  {
    title: "rahul dravid",
    runs: 10889,
    wickets: 4,
    catches: 12,
    matches: 344,
    century: 43,
    wicket5: 0,
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSExIVFhUVFxcVFRUVFRUVFhUYFRUWFhUSFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGysdHR0rLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0rLS0tLS0tLS0tLSs3NzctLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYBBwj/xABAEAABAwIEAwYDBQcDAwUAAAABAAIDESEEBRIxQVFhBhMicYGRMqGxQlLB0fAHFBYjM3LhFWLxNIKSQ1NjstL/xAAaAQACAwEBAAAAAAAAAAAAAAACAwABBAUG/8QAKBEAAgIBBAICAQQDAAAAAAAAAAECEQMEEiExQVETFCIjMkJxBVKB/9oADAMBAAIRAxEAPwDWk3QHtBJaiMsdVA8/VAgEFRyXUjRdSloV2QpAUUgkquTSAqJktESIWRFxTXBTNmBCjIUIU5IzVdBIVtgXHxVUIQBymY6yYGUubBNi1yu0xMJpu4D5JscMpK3wimzpIFyd1xzGncn6IjisnLGNpHIZTQkPaGgA7hocfE7yQhzh1JWzT4Mcr8gSckStawbV80+jeJPzUAlCkY4LZ9fH6FbmSBjeBKmiaODvmoO8HGyTXBC9Ljfgm6RZmbJ1KHnEOruVcjmcNj77KV7dXxC/D/CzZNCu4hLJXZVdjHAfEfcpkOPk++73KdiMGeB9CR7AqldtiKedlhniljf5DoyT6L02aSuGkvNFSqmlvFcAullj3bJkEpBqpSLKq6yplptO0y+cUSrEGOc3YkKhGE4PolOEb4Rp+3lqrCn+sS/fKSGd4kr2Ir7M/Z6PCUG7QIzCgPaFyIzgIPpVVJszuQrYdY1Qp0NXknaq1YVCm5B48cpuojxjAnnFtK67CNItRU5sKWnatdk3GsOThD8+jy4VcugjFi29E8YsIV+7vH2HedCud27kfYpv1oGSw5HiW81K7Eta3a52QjCwk3Ow3/JWH+I/rgrx6WFgTlQ6MF726q0qKtG5FaUB5rdGBobodPFAwGhjj8b3gCzXHe/lxWShpHEZiAXF2lnENoKl9OJH+UXxOcd1C0gyF0gq0EDkQS69gXbU4eaVqrk0oeC8arssZtjhhAGicYgEEhjgdTHV+O39NtLU4n3WJmlLnF/Fxrba90SzydwbDE8lz2Mq8k1ILzZpO9aITG7fyWrS41GNvtgyfJYgZq3TnChUcJpxCsd4KXWsU0QSSV3UjKOFK0KY+KuygoQaceqlhpcFyKRzHUd6f4R7B4QaBNM4sjPwtA1SS9Wtrt1NkPybCNIOJnH8ph0tZW8zwLNH+0cT0ViTFulcXvNSeAsGjg1o5D9bpTnJy2x4KdLssy4vDGxglA5iRpd6tIp81FLgoZad3OwHhHNSJ56NcTpcfVRltVDK0CvCvso8fFJv/pW4p5nlssPxMc0cyLe+1OqpRuRvCY2SGml7tOxYTqZ6sdULuJwTJgXxMDJWjU6MV0PbxfFyI4t5VXNz6eUOaGxkmCJBZVQxXnNsoQKrEMGsFFKwDimmQBRulBR/FL0Qs0HNJVbc0lPjl6IenwoD2hGyPYdB8+YlEM6R+C0eA7Htmbq1UPMLOzuVnAdrZYfCKEDmU/HjeRUHjyyxu4mzw3YiJo8RqVW/hmMTN4jeiz0vbaeQUADfcpuXdqXxvrK6vIp8dG4cxGZNblyXudnpDcoioAQPZRYjJYQPhb7LG/x//NFgGc0Szftgw4d3duBdQDy1cuoCr48t0/Jl3Lsy/aiVnfuZHTQzw2sCRZx/D0QYmvhaCT5c/dRlxPrz/Vyj+GyqJranEOoWjvNJsCRSgoDsTt0W+WRYoVIUk5MdleILB3TS2jR3kz3DUIwBs2m559TRPmzaSSCR7GAfzGsjAbVwABdU04im/U9FXDcOxpYTJpPxFrnUJBIrQChp4bdCuOhw8YfpmkZ4NehtWlwB+EBw3IIofPgsdQlK2h3NUZqWSpNTua1rUnqSmtKWnopWimy6dehJ2N9FbY5jxQ2Krh3NoKQDTsSD12RIodNhiy9bKfBYF80jYgd6kuP2Wjdx6JYZxpQ0I68uiJtb+74U+LTLixz8TIBb3cgyScVx2FEhzLGB7w2MUiiGiIbWG7vMm/kQo4ZwbbFCpcC4Coed9kRyDBNe5xlLtMbHyODTQuDRZotap4qo/gqBasIRPBG64881Nh8PHI18oDoGRijjqMwceDWto01/7qdF2bK5Gl5FHsDGyBw4tcaaqedaitqK1lT4YG1k+DyKWaLvIg14FnMDqSNpW9CLi3PiqcYfG6t2kbHY1B/wQUWyDNBCyeJ5MbpGAMdcUcASK8RWrbrU43AwYiOOPV8FWCVpBo7uxIS77wNDyWaWeUZVLlDFHyjy/MN6gUDqmnLnT9clTAR/tBlbogCSHNcC6N7btcBQGnuPdAg9c7NBKf49MdB2U5o6uUpwdrLT5R2X79odqoj+G7DtaPE4lVk1E00onW00dPs/U7PMv3N3NJenfwjH+j/hJV9jKHWk9lnDlCs/FEUwyE9pJaDzKScgzMtalCMQxwcbFGsRIGN1EgAbrM5hn5NRGLc1t00nHsFl6ORw+yVx0Ejzt82rOvxsh3efeia3GPGzne9fqtX2EDyac5RL90e4VzDYF4bpNN6kVH1WYwufyM3v8vlsj+BzuOTiK+x9k2OWEvIL3BnLXSQuLgxriQQAXBoB3BdUGo8qLj8bO2oYwBppRo4NF6b8ee/VQh9dil3hRPFFu3yBua6JcTmMzg8OiHjrqo3YFwcQ2jrXvVMZnRBlIFHyClSaaA34Q0aeVjU3XBIk6hs4AjkRX5FF8UK4RN7B37ryI/H1SEDm8B9VYdhB9klvkaj2P4LpLxu0OHSx/wDEpy4IQkNPDSfkmmMVv8lOcTGTpNjyIoR7pBoB5hRkJsswHeSsir4SdTjyY3xO+QKr5rnbJZnPIoPhYNBsxtmAE9B7konhpBDhpZySDKe4jI3Dfie4fMVQyLExusaHz/HqlL8pN+gnwhkWNjPGnmiGXzFjtbCK7UsWuB3a4HcFU5cDG77Pso48AW7OKY0/IAfwmMYRJG6IRxuo492XmjgfC8B7jXemmwpsjOCzmGmihDToh8VNRjLXh7idhdwNlj2h7eNQjWWMikw8jtJe9pNaOLXRtoKPDdnCu9eCzZYRStkTYfxmFbK98QYw0kAcXA6jGdDBJHIKXafDQVHiqhsJnwrRLF443OJEdCb0kAFOjGGpTjBPE7uoZS/QA90YJaQWlm7TY3cBY3VzC5mJixmkRGJ7X6XGlQGyB9K8avHh5DeyRTqlygypnmYxzYaHRbund3Q70LG3PO7T7LF4htHlvI0Ww7T5Q9kQnAFg3vbaak11SW6mnl5LIlpLqndIzOO1UHC7C2T9qHYcBpFQik3b2R4o1oHmsTjI3A7KNjiOCfihCrYRrf4wm6eySyXfO5JJtQKpHq8G6C9qTavJGYFkv2kYru4gBu4kfK65EFcqCb4MJnmZGR2kHwi3mhRK44ppWmyh1U0uXE0lU5Fic5NZvXbqLJOCdE1KlItBfAZ1IyxOodVpcDmkcuxoeSw+lOYSDUFOxaucXz0VLEmehlidTqslgM9kZZ3iCP4TPYX0BND1XShqYT8iHjcS+AV2ifG5rtiD5Jxb1T07A4IXQtdYhp8xVUZsp/8AbeW9DUjz6IsG9fkuU6qETIMwxkhZFH3RMcTNPhNS4k1c4gqiySF9rNdyI0keiKhteaZicPG8Uc0OPM39igUaVIu/ZVaynFSscqk2Xhl2SFgHBx1NHvcIN/rwa8jUKA0qLg+R5KnljF8sm1s0hcr2EzZ0bdIDNi3VoGvQ67mB3IoLBjWPFQ4U81aZKArdTVeCuUbHDZpFK9znvc4SaGiN/h0AyNc6jhuBpHFSYvLRN/Mf/Ue1wZQloBj1anEcqmMe6xL3V/XNFcqzySOmu9AWCu4a4guA9WtWaWFp3ENSs0WX457GOw8hD9TX93KPGH03Zfc79RUdFkMZhw1ztO248jcD5/NaORzRBWKrw1r3BxdQNIk1VI4PDS6/EA9FmsXiq36D6D9eyxZ4urGxKxIO4VlmHbTZV8O69SrT5VnTYRF+6tSUlUldshs8ObrIftQwxfC14Fo3X50cKVWvwwQ/tKwFhHp6ckCdOyzxCq4Vtf4VjleA1xZqNLULR5ArWYH9i7HAOfi3kcmxhvzJNE5TTKPHVcy7KZ8Q7TBC+Q/7Wkj1d8LR5kL6Byn9m+XYa5h7133pSX36DYLVYeGNrdLWhreAaA0D0FlTZZ8/YX9mmIpWUhvHSzxHyLtvZZzNMGyGV0Ta+Cxqbl3H8vRfTuKIcx+mmoNdTodNivl3HxPMjy67i9xJPOtyltlpNMQaF3Qqpt9oKxDKDyQMOznd3UjY099EqqugqEzEOZs4hW4+0cjeNfNDZSOaqvc1NhmnHpgSxp+DSN7WO4sB8qpO7Xf/AB/MrMtaDsU7uk77eT2L+JGlZ2llkNI4qnoCVDi8zxXHwjoEzs7mPcusKLZDDNm8bWgB13A8+YSZ6qfsbHCjz4iSV1KucTwNVLjMqdG2hC9CwmUxR/Zvz/yosZlgcCN+iyS1LcjQsH4nlrdTDVpII9ETwefPbZ9xzV3Mcq0u6ca7+YQmfB0r7rXj1El0ZZ4/Bp8BmjZNnAfJX/3j1WGw2D1Os6h+vIDqrsOZSxnSQXDlS63w1qfEuBDwu+DbR4t4Y/S4jUNLgPtN5FVpItJoTU0BP/cK/j8lTy3GOkaQWPb5tIBHmiLGajU8UGqyRcVtdkjFp8jQnRrb5R2SbIwE/VXf4JYNlhGHn2ldW/8A4LHMpK7IV8MbqrnTahWYBdRZiyoQlmawopKz+4fVewZefAF5RHQSN/uH1Xq2Wn+WPJGQfjWGlVEycBvVW5/hPkgsmGcATzVohNg5xqO114X+0fKThcU9tPC862HmHf5qPRe2YbCuBDisn+2HLmyRQSfaBLT5aa/ghmkFHs8LkhdvQGoql3VBWoBPBaCbLgBwoPP6LmR5OJp2t+y27uXQJW9UNWN2BS8hPbJZb3Nez0ejwi6xWOy98ZNkMcsZDJ4nFA+WRRE9U94TWtCYhHJxjCSBa+ylLC3ipIsLXZHMv7P6rm/oUMppBRxyZTydhc6umtOPBbfKyRTgo8FlLGtDQKHidkShwekUWTJOzXCFIvu8Q9FFpPOydhjQdFHPLYpSDoz+b4a5Fb30+fJZyWA2IFqVv+v1RH81kq6leoPI1qhDQfE6mxHoSRQ+q24lwZMnZQ/d6Fvmen/G6OtxsWGo0M1SEVJfsPJV2Q6nAWuQfTj+Ct9nMjGJkkkmdRjSdPEONfhN7WUnJeQsUH2iTD9siLGJhFfbpRGGzxzASxt0g7tGwKH5pk8WprQ0AE7iyIYfCCFugbb/AESozV8GjLjextnqvZr+k3yCM0QTswf5TfJG1tRyxUSSSV0Q89iN1DmrqNUkRum5oPCllmZi+MeY+q9dys/y2rx9/hcDyK9Ay3tPEIxVwsrRDWFy4SDwWbb2thP2gn/xTD94IiGgACx37RY9bIWD75Ps3/KJt7TQ/eCB9p8zZL3eg1IJ+aDI/wARmNXIxsmTRndoJ8layjABhJaB1oiUjBvxU8GXOEJeBXe4N7LC23wdCKS5BGMeSellA/BsfZylkBLl2aIgAhL5XQ5pMFP7KMkJAFL2VSXsFQ1BNOS0+XYsatO3FG2S1smRyyXAiWON9GJy7s01lC4A8Lo/DhmUoGgeX5IviMM38aqoIgNiqcpPstJeCA4PkOpTNGn/AD9FLPiyLUuqT8WgC5JJZKDh5hC5pbm6nnmCpGpKtFMC41+pxruASPMC3r+S5h2agONBqJruADpB61p7K9isAH7Eg/Wyt5flZLmxg2rfmaAm60rIkjK8bbKWYZf3AikB/qNd6OA2+YTuzeUPY3vdTg77TOFDTxLS526GR0OGoHPDtQ9G0I6Vt7IjhsP3QJNKu8IbuT06LNKTo1wggeYQ5pcR8Nx0pf8ABVcXJdXcTMBRlbk6n/7Wt4HzsPVCpHVJP65puCF8i9VkqO32epdlj/Kb5BHlnOyMo7pt+C0PeDmtyOaOSTe9CSso8+iN1DnHwqZoo5Q5wKtQFmSxBqoApsQ5cjFVaLJGbJ2lICycxqjIQ94RZS4eWhT3RhVXuoQglyi48MLPlOk+6fgs9DT4X03qK22pQgqmx9qVWXzZ381wG9eCyxjbo6Dmoq+zVYntDC2pfpHGgUWH7TYWQgA087LI4TK3Suq4aW134nyqtG3s7BQeFwp9qtz1VvHFFLK2SYfEB+IaG33NuS0eIOnxBCcpy+OGrmh2p27nGpoOARN0wPrZLkq6Gp2NkxBIsfRQibjX6/VcJoTfb5qLet/wQMLga5xOxUDmlWHEGhH69FJpI4VCooq9ySNrc/yVV7KW+qIPNrcqEVqPRQFteF0aFyK7WJ+GxPduLr3sD57n2UjiBQKPI4GzPkLjdpAA5VN7eSMpFnC5XhWyHEPe5zybF3DfYBFZ5nyR0iAA26+YoposubShoadLJuPxYiAbHY9EMU5MJvarAWKY2MFgJLjd7juT+AHAKoCp5BWpJqTxUNRVboRUVwc/JNzfIWwOdyQtoFN/GE1dggznhVyKlELo0f8AGU3IJLP6QkoVRtftKLNvhU5PiXMwaC1UWZGSGqZDEiLolo8lyhjmVICTlyrGrZa5MgYiuGMr0F+SRgbBQtyiMnYLN9/GFtZhA0qN8S9Afk0Y+yF1vZ+M8Ap9/GRxZ53I+gTY+7BBOmtBuivazLO5loBZzdQ9CQfp815/mbptRc1riK0tsmQayK15NSlwrNxK1hA8QpTevFTxuj0ikjajhW/ksHBiKtq5zmEUs8HfoeKeHl7atkLjuQ1tfnwV/G/Y278G3kfS+oUHJVDi725/JZOmKHwg03uQFZwxxLql8dWjjqFfIKnGuweTVRTA9fVITXt0p+SE4PFDYAgjdpV7vLj3SpobGRbxE9OND0+igGIJCrTzUO/uoo5KdSqUSOQQL+KQkt16qqJB6lNlmpRGkLbIcxxmhrnchbqTYBX8ty4sgDr6z4nGt6miCvYJJG12aa05nhVazCPsAilSRSVlRmLmI06zT5/VUmPOpxJJNePRFZ4ALj2Q6aGlD94lNwpWKzydCpVQPhIKJwRgbqLECuy0syA+QUSiVrE0aLqizFt6IlCTVoha1JKD97aki+GfoujdPHi9VzGN8K5IfF6p+K+FJKAUgWx7Pf0x5LJujWs7PjwDyWDX84wodl/GvoENwc1/VFZYaqqcvvULhIcRzPrfkkzG6bdFMcJVRvwQVqiGZ7auEjGvFSWEg+TqfiAsjG1rRe4rWnNennJ2uDmuuH2PqvNMdg3QyPhduwkeY3a4eYIK6ejyprb6GQZA57D8IoOXBPwmJjjdqLalt2jYV9VRnynUSdRPlX8EyHJHA1FbcTU/Jb+DR8jqqDEuK7wkmnOwskxw8wq8OXkfESp3RaQlMm4ZLGBV1qofPi77q3iNq8OCDYmKrr2VpICTJ/3mp9fkp2TUP4qpQNG/5qF84oiSvoDcEnYnrwUUk9q8ENjlqpnkmjQd0e0GwplEVTqWjiPJCsviDQAPoijCs83yPiqRYebcFnsxzyJhDXagRvQI041FFke1uDOkvHCx8ua1aZq+TPnXBfbnkLtpQPO31VrD5hG7aRrvIgry2RxrQI9l7i0AAef+V1MOnWR0YjXZ3dqEQYUEIxlEHf0jJoeHXmFq8D2Fbu51Qh1G/B+ETo6L4OXkMD+5dUl6f/BsSSzfNqDfv0RDIPEfNdxB8K44+MqXEjwoDggpz1p+zx8Cy8i0vZ+QaRdYdcv0w4dhwLqY145rusc1waY0T0MbMS+lUQlkFN0HxEJ1agQookCUMt6LF/tAwmiVk3Bw0n+5t/ofktfgjzTc8y5uJhdESATdrvuuHwu/PonYJ/HkTLXs8yEvIi3RSwzjj6oDmOvDvMUrSxwO3A04tPEdUxuZBp4H1Xbq1aGrIavvmkeQQ+fECtKCyBYjOLbobPm4ua3Py6q1jbJLIg5icWL0/CnoqMuKG6AzZiXKF+IJTY4hTyWFsRjxWyq99XyQ90ysYSF7zYEo0kirsIQv5I1leFJIcd/oq2X5WRQup6o9hmjiLcBz6nokTkOhAtQDrb9bKbVwUFT+rewTtazjyw1C+0RAidX7VgOvNEIifKizWZYnvpTT4W+FvXm5PgKkrZkcXgC12qnh+iJZa8UH934ItLhVBhoADYcfmu1/jMjlJr0ZM2ParC2EkLSHNNCNiOC08HbOYNoQCfvbV9FlYBWyme2m6688MMn7lZkth/8AjGf7o91xZ2i6l/Sw+iWbuT4z5qbEnwqKf+oU/FHwrzg4EA1UuHxj2bJrIzRcAuqlFNUywjHmsildmr0MdYJlUr4YeiWEH5o9QyZs9VgFXmLRu4D1CJaeL6iSy+3OH9E//WJEE/fIhvI33C6/HRgV1t90S0if8SrLOfZkwwudiGMexorRwB8gP+V5NJiA95IGhpNmg1oPVHO2eeiRoiYDp3J5rF1T4Yli4aJbDzMMHCoefquSYCgrX5KjlEpD9PMH5IwDUEJWR/lwMj0CJGEbprWkmguVemYiuVwsaK2r1QyntQUYNkWWZATR0nstNhMM1mwAUWGdq2HrsFZjtc3WaUmzVGG1FpkVdxQfX8lI1hUMU9d7nkFeEf3rchzSWNRBpPDbifyXQAppTXyCHYqU7BRFsrZvmHh0M9T+CHZZH8r/AOE6dlSreVRJl0gUuRmbyCOOvFxpX8lnxj2tJoSvRWZM14a+SPU1h1NqPDXmRsaFAp8pbi8UIqUqaEtABAqtul1vwx2pdmTPBzYCbnTbUNFPHnDTbUiHbTsHHhKd3M5zqVc14bYcKELBPyySvD0XXw63JkVxjZllCja/vTfvLqw/7nNyPuktX2Z/6i9h79i2+MpYhvhT8X8adK3wrzw0EauCayyk0UJqmujV1fCI2l2NeVwlWG4aql/08kI3il6F/ND2B8xwzpWaWyOjP3m0J8rrLYrsnOdsTUdQQfkvQW5W5KTK3XJ2Fyf8o4PJFcE+SD8nnUXY+Y/FiAB01H6qPMckigbqlxT+gaBqPQBHs6zgNqyE1O2vceg/FZCXBan65Hue7c6uK2QxZ5LngK0D8LAcSZg2oEcbpACak6aVqed0GcLre9lsKxs21O8BjPIarUosVj8KY36SNt/xWfLjlCTTD8EeFfpe08itA08VmwtBh3VaD0WSYyHofpq5FcNC1v2QoMuaK1cLI7HEw7U/Xks+SRoxxOQvtv6VspG1caAV+icIGi9h6fmrMLhtv5/kEhsekSYbD6b1qfYBXB80yPb6JEoLCGTBUZW1V5zuaidHVQgMdHdTxPbGC51gAjGV5FJOfDQCpFfStOlFVz3sxJXT3rA3rXfj0/4TsKjKVTdIXknS45YZzrM3NiYAaNLG0A6gGp63Q7shF/NdN9yriTag81Ux79Qa0XIa1teFQKW6Idj8fojEDDb/ANQ8/wDb1Cdg0/yzcY+zNKVK32LtZmxxUzn18Ow8hb8EAIT5HpoC9ThxRxxUY+DHJ7nycouKRdTij1vF/GpjskkvLDAXP8S49JJNw/vQrP8AsZZwqKR7BJJdOZyIlgIZ2s/6V6SSTHsdj7PImbepXH/CUkl2P4r+joros5L/AFI/72/VAe1f9Z/9z/8A7uSSXJ1Xb/oaujPlHsB8ISSXLmNh2G8N8BVgfZ8kkljyGzGTuVzALqSUxiCcX4rkuySSBdlkPNSRrqStkN92U/6X/wAvqst2i+I+f/6SSVPozfyYEw236+6VlZNz+uaSS73+H8iNQRc1IOPp9Ekl3/JlGJJJKEP/2Q=="
  },
  {
    title: "Virat Kohli ",
    runs: 11858,
    wickets: 4,
    catches: 126,
    matches: 247,
    century: 46,
    wicket5: 0,

    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRON47IIEY_MEi-HgN9WwTN-hEBk_axZsc6bzL2kKRSE-msGA45"
  },
  {
    title: "Dhoni",
    runs: 10773,
    wickets: 1,
    catches: 112,
    matches: 350,
    century: 10,
    wicket5: 0,

    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/70/Mahendra_Singh_Dhoni_January_2016_%28cropped%29.jpg"
  },
  {
    title: "Virender Sehwag",
    runs: 8273,
    wickets: 96,
    catches: 15,
    matches: 251,
    century: 2,
    wicket5: 1,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6b/Sehwag_72_%28cropped%29.jpg"
  },
  {
    title: "Ricky Ponting",
    runs: 13704,
    wickets: 3,
    catches: 160,
    matches: 375,
    century: 30,
    wicket5: 0,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Ricky_Ponting_2015.jpg/520px-Ricky_Ponting_2015.jpg"
  },
  {
    title: "Sanath Jayasuriya",
    runs: 13430,
    wickets: 323,
    catches: 123,
    matches: 375,
    century: 28,
    wicket5: 4,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/16/Sanath_jayasuriya_portrait.jpg"
  },
  {
    title: "Shoaib Akhtar",
    runs: 394,
    wickets: 247,
    catches: 123,
    matches: 163,
    century: 0,
    wicket5: 4,
    image:
      "data:image/jpeg;base64,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"
  },
  {
    title: "Brett Lee",
    runs: 1176,
    wickets: 380,
    catches: 54,
    matches: 221,
    century: 0,
    wicket5: 9,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Brett_lee.JPG/450px-Brett_lee.JPG"
  }
];

export default class Compare extends Component {
  state = initialState;
  handleResultSelect = async (e, { result }) => {
    this.setState({ value: result.title });
    console.log(this.state.Player1.length);
    await this.setState({
      Player1: _.find(source, { title: result.title }),
      Player1Flag: true
    });
    console.log("Player1", this.state.Player1);
    console.log(this.state.Player1.length);
  };
  handleResultSelect2 = async (e, { result }) => {
    this.setState({ value2: result.title });
    await this.setState({
      Player2: _.find(source, { title: result.title }),
      Player2Flag: true
    });
    console.log("Player2", this.state.Player2);
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value: value, Player1Flag: false });

    const re = new RegExp(_.escapeRegExp(this.state.value), "i");
    const isMatch = result => re.test(result.title);

    this.setState({
      isLoading: false,
      results: _.filter(source, isMatch)
    });
  };
  handleSearchChange2 = (e, { value }) => {
    this.setState({ isLoading2: true, value2: value, Player2Flag: false });

    const re2 = new RegExp(_.escapeRegExp(this.state.value2), "i");
    const isMatch2 = result => re2.test(result.title);

    this.setState({
      isLoading2: false,
      results2: _.filter(source, isMatch2)
    });
  };
  render() {
    const {
      isLoading,
      value,
      results,
      isLoading2,
      value2,
      results2
    } = this.state;
    return (
      <div>
        <Header
          as="h1"
          content="Compare the Player"
          style={style.h1}
          textAlign="center"
        />
        <Link to={"/"}>
          {" "}
          <Button color="red">Back</Button>
        </Link>
        <Query
          query={ALL_USER_QUERY}
          fetchPolicy="cache-and-network"
          // variables={{
          //   id: empcode //inputs.username,
          // }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <div style={{ textAlign: "center" }}>
                  <Segment>
                    <Dimmer active>
                      <Loader />
                    </Dimmer>
                  </Segment>
                </div>
              );
            }
            if (error) {
              return <h5 textAlign="center">Somenthg went wrong</h5>;
            }
            if (data) {
              source = data.getAlluser;
              return (
                <Grid container centered>
                  <Grid.Column
                    centered
                    mobile={16}
                    tablet={16}
                    computer={8}
                    widescreen={8}
                  >
                    <Segment style={{ textAlign: "center" }}>
                      {" "}
                      <Search
                        size="large"
                        noResultsMessage="user not Found"
                        style={{ width: "initial" }}
                        placeholder="Search here"
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={_.debounce(
                          this.handleSearchChange,
                          300,
                          {
                            leading: true
                          }
                        )}
                        results={results}
                        value={value}
                        {...this.props}
                      />
                    </Segment>
                    <p style={style.centered}>You have Select</p>
                    {this.state.Player1Flag && (
                      <CardDisplay value={this.state.Player1} />
                    )}

                    <br />
                  </Grid.Column>
                  <Grid.Column
                    mobile={16}
                    tablet={16}
                    computer={8}
                    widescreen={8}
                  >
                    {" "}
                    <Segment style={{ textAlign: "center" }}>
                      <Search
                        size="large"
                        noResultsMessage="user not Found"
                        style={{ width: "initial" }}
                        placeholder="Search here"
                        loading={isLoading2}
                        onResultSelect={this.handleResultSelect2}
                        onSearchChange={_.debounce(
                          this.handleSearchChange2,
                          500,
                          {
                            leading: true
                          }
                        )}
                        results={results2}
                        value={value2}
                        {...this.props}
                      />
                    </Segment>
                    <p style={style.centered}>You have Select</p>
                    {this.state.Player2Flag && (
                      <CardDisplay value={this.state.Player2} />
                    )}
                  </Grid.Column>

                  {this.state.Player1Flag && this.state.Player2Flag && (
                    <Grid.Column
                      centered
                      style={{ textAlign: "center" }}
                      mobile={16}
                      tablet={16}
                      computer={8}
                      widescreen={8}
                    >
                      {/* <Button
                onClick={async () => await this.setState({ Compare: true })}
                positive
              >
                Compare
              </Button> */}
                      <Button
                        color="green"
                        onClick={() => {
                          this.state.view == "BAR"
                            ? this.setState({ view: "ICON" })
                            : this.setState({ view: "BAR" });
                        }}
                      >
                        {this.state.view == "BAR"
                          ? "Click for Icon View"
                          : "Click for BAR View"}
                      </Button>

                      {
                        (this.state.Player1.title !== "",
                        this.state.Player2.title != "" && (
                          <Segment>
                            {console.log(
                              "Player1Player1",
                              this.state.Player1,
                              this.state.Player2
                            )}
                            <Grid columns={2} relaxed="very">
                              <Grid.Column>
                                <ProgressBar
                                  view={this.state.view}
                                  title="Run:"
                                  Player1={this.state.Player1.runs}
                                  Player2={this.state.Player2.runs}
                                />
                                <ProgressBar
                                  view={this.state.view}
                                  title="wickets:"
                                  Player1={this.state.Player1.wickets}
                                  Player2={this.state.Player2.wickets}
                                />
                                <ProgressBar
                                  view={this.state.view}
                                  title="catches:"
                                  Player1={this.state.Player1.catches}
                                  Player2={this.state.Player2.catches}
                                />
                                <ProgressBar
                                  view={this.state.view}
                                  title="century:"
                                  Player1={this.state.Player1.century}
                                  Player2={this.state.Player2.century}
                                />
                                <ProgressBar
                                  view={this.state.view}
                                  title="Matches"
                                  Player1={this.state.Player1.matches}
                                  Player2={this.state.Player2.matches}
                                />
                                <ProgressBar
                                  view={this.state.view}
                                  title="Five wickets in match:"
                                  Player1={this.state.Player1.wicket5}
                                  Player2={this.state.Player2.wicket5}
                                />
                              </Grid.Column>
                              {/* 2nnd */}
                              <Grid.Column>
                                <ProgressBar
                                  view={this.state.view}
                                  title="Run:"
                                  Player2={this.state.Player1.runs}
                                  Player1={this.state.Player2.runs}
                                />
                                <ProgressBar
                                  view={this.state.view}
                                  title="wickets:"
                                  Player2={this.state.Player1.wickets}
                                  Player1={this.state.Player2.wickets}
                                />
                                <ProgressBar
                                  view={this.state.view}
                                  title="catches:"
                                  Player2={this.state.Player1.catches}
                                  Player1={this.state.Player2.catches}
                                />
                                <ProgressBar
                                  view={this.state.view}
                                  title="century:"
                                  Player2={this.state.Player1.century}
                                  Player1={this.state.Player2.century}
                                />
                                <ProgressBar
                                  title="Matches"
                                  view={this.state.view}
                                  Player2={this.state.Player1.matches}
                                  Player1={this.state.Player2.matches}
                                />
                                <ProgressBar
                                  view={this.state.view}
                                  title="Five wickets in match:"
                                  Player2={this.state.Player1.wicket5}
                                  Player1={this.state.Player2.wicket5}
                                />
                              </Grid.Column>
                            </Grid>

                            <Divider vertical>V/S</Divider>
                          </Segment>
                        ))
                      }
                    </Grid.Column>
                  )}
                </Grid>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}
