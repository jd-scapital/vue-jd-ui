<script>
export default {
  name: 'Icon'
}
</script>

<style lang="scss">
$--font-path: '../theme-chalk/src/fonts';

@font-face {
  font-family: "iconfont";
  src: url('#{$--font-path}/vue-jd-ui-ie.eot'); /* IE9 */
  src: url('#{$--font-path}/vue-jd-ui-ie-old.eot') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAB8IAAsAAAAAOxwAAB65AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCIYArdfMpEATYCJAOBPAtgAAQgBYRtB4RgGz4wRSGwcQDB8L/xZP8fEjg5D6tDAWd0TAYiheIJlFMO07mlx133tol4BQ3LDKssm+Udq0aaxOL0l+dZ/HEtPtsMpeTh69737L62+9KrlUrxOh6gAH3CFPCIRSSU8dBNE4iV09SNTn3VbH+Xv7bhaQCF8XCQ4fm5/Z+7e1cJCzZhJWxEjqoNdseAbdSIHCgbpZQBPRsbEzARLMBK4CmgPnxPeEbyn2AlfnxVDF3uFv9au544TE8s4qcCoAACJt9pvZQUZqQk3Z0zBO44ULgHzIYlaI8pP9avdV9vbMtJWg7YTmGBS8tgyb8PDteyXbtnC7R3JYbJ5ABVgcgduCpXoWqBJ0kJ/++n61vR7De5kqJZLX97Lu0+QgaYCJMDJvZ/usx29yhAeDwJvx6bIlU5X1rQnxl5PdrQmOVD2QFp15cnBYFLkswKSkcoB6hKT1ze9cGmT1Ola8NdUjRd+kCoLnOOIoYu/mlALRiMNT00235/amiGyoiQns9/++dPwmjXE92h8SmgaHmDJaRJsSUflExVW7JJUhp6zou2/9QKq+RfHgPAC/380x8YUgGyrgHeAt2b1fPB1ds/FLb+W9nwcsvUKbgvRYNTQkv64Da/A7zEU8pHXjPxugfxRZYDxh3PD539Z+OY8h7h6Ocn7wcOaIOiGk2ZNmPWFmvOmqLqNL25ajAxmlpbWBqtbDRbO3sHRydnUnbo5u5BOfXyDn/FIy2pB96c05Af7aMviYCEcEAEQ+gJljAQHKEQPKESAmEkRMIUIRGmCZkwQyiEWUIlbBGh6aqFDsIcYTBiwgRhngiLsECEzZghHDBlwgVjkvDA6BA+dDkRgLBMREhYISJi1IoYhFUiEkaHSEHYICIjbBKR63KigL5/ogRjkqigmyhqMOaJBgxECwaiAwPRg4EYwECMYCAmEBpiJmRiYUwVKxiIDQzEDgbiAKEjTsZscYGBeIGBeEPniRs6xANC4ocWuzd+Eb/IA5AqMPsGLO975idt7uSmW99oVa3PM+eYUdVzncGZGqtGJbwI8NI9NiddR6WFvIgVpBP0KivPEoS+ATECziUz1f2YsMOAfZ6EMsxvyuvBsbE+FnhsQpnT+/Y5UzwpE6QXpLEmjS7pCOdxcPPq/X0y0d5OdZwHPhmrizY6ZOusRHDJz2Clby1+zOW88AxYu0WFOC45GeP4gMikB5ACF985fkSscqdY7H7gdtrQrlpLaRKugmT0L5M4h7FuDO3W0YU1fVkUNFVWRPye4T8cO3UZlX/iWtKk8ao+aeqHqWs5KGd7hOGRevwL/I8l/7n455gM7HHDW53on5f1V9n6WLhcz6SbkR2AVCZ3tsJKNhVN+6V0ttcn0WHxD2VA8icT/27FBFywRHEh7d2omG71aVhI+YFuK4ZH+lTWXSsQDvc2t+yNfKqxSbdL2kaLeslWHSKQCSPR0FPDn+0YxgDDrDUZ/mwE5EDjXq4stIX7/sP4d1KRttDXwI58cpfl2B6EhFEXQMYn95bjPT/vFI+/muOoxNFcx/GMjWn15PqJn279dDvRhcAdi7J4Q3tjdOPrQuq6YTfbYlparHYQ0mGLwdaVvP72xHn6o3BzbPMbd2nrsAaXIzKxtzW3euGYpz2X92cKu0NrdJc/vXIej9D1Umu2+OeTk9ToXs80SWJrzMhvEHWEyrLlSrvsF+OHrykNw1M/37v23Aw39bhfq9tBfsgKJd+1PhwmEdJRCqemH5bnzjy2Ds89qRo5/cjU/YvZMQpoL+f3sPVawrio6q2rjul1JWn58d292n3u7onkOPLrbocxZY+6lrBrdes/6ye2Vok1B0fSUzsA3DmZru8C5t4/7dLgXq2k518jTM26RyyXqXyoMz+osiBzSnMDYJR3u1TfObTj1QsuxvhX/ZZIiQmu194l4zid4NyvhcSlpO9AFu7hHo/kS49fHLyh0hZF51VKXuATvEMyG7v2lbsE302U52vnuYUmdWnQ942Xvz17Yvzy4Nc4W+Hb7QAcuWr1yBV2G/rIHDp8a8CCAT6KIQXAQtCGkGRSEftj8JQraUsQNgcfsr/bLJ7GlNfCwBBZEGBYh7lUFmS6W8XB1nZtpLNZSJ2pfjHQFtb7lTrN43KOv88NJWdmrHGrAuoaFP/cErGsV7+etP1agowdkT7OQsJk3dV05ADLlTFAjhUPMH0jAWIGiYJmXyizVfUcSTOaZcdpmNHuNE4doJ2G5bdRd8NHvJq7PqHhyIB3i4OWLwhVX2UksqXJw83L68MpdJD2y6FNkHV40peACw1YMZx57AJWQz57RYfkcqXtfybkMi7hp7kJpmMnsC5V0FbuhE106qKW5kXw7CN2bWAFdgZeERkKBF+vmz3Xr+EyCUlHUgdATNhoI5S98SGn90QwbUsQHXChik4/yNVrkIje9UTFfGQGsjRxTt80EMR0s6Bbd5cSfF7h+VCcJ0Ky/r3TvMa8L2F72gW4WFdxwL9pXBeN2j1h4cmW0+421USFOHP963kVIYMxfMx6nYYUU1B0EVZHbo/eKV7HXEfiMwXLnMlIEagmHMeatMtyMf46crpKVIIIYohBFmSO4uO/QJen0HmQ/YkqPVFiHgUIiB1mr7rwDHk0+BI/vVR5512pZTrSGWsAYOWdtoJmvtL/GpaO/fj4T5AwEHAko7qrMK0D7DIF5gMYEg8dvtKmXrtzGkEZvchHFfwLnWzXkxNrezCvDX5eacmmR1MIBuXPcGcdtqIq68PmhTLSMe1Y7eqzTTuyv4jT8dfwV7CBdGTqGMJQIQDTiN86DBNpzL9O1uiKtWyvjvsr5+n6WrG1esE+t3wY7xYUpvXK3Yum35DD73XUooPsLbJdo7JuIXBvCCCoQXfA6eqWu6PBFWaHtU5tdYkwcBR7lazVehXTQ3YAZs4XLF/xlLwrD1RP2eyFImF4o/JNWBKbpS4AmK4UBvxllLNXG2xwDb+LAB7KDVc/iR1IQ26Id7YV8q0szUGJMnpsYIXmObF2aydKCxvQibuvgXXTGG4uLmaX5CHRUdpWKnaLuCgaZB0N5bBzhbYPTD5tXyG0rlzr1q+AuinTGRo1xeeb6nDraaIOhazsWjivME2BjB3IijuggsRFarQiw7nMn2j6jw3tp6bxsw8zXJ++SKKOhQzH1LefbtcrHlPSn62bE2GzDAJpu+N5qska6KfWXJcxxfA8x5FHDo4DA2SGzl6cQga9KJqmJXV6zZ7MFWc9V4rJxVzXkTSn21LrqWz6SPaQwcAHqHusp8kTT340ZeWHNZc2l0Q20zCWRko4oPYBWSfq/d4gDorcm/2cYP4FLuBeTz8J8Zw7Q0LxpReFZBzy5ZvEClIMZSW6HbyZLVUFKqVE9laLgpdqdxQW1YTX5PBW6E6eWuFMzseipzJ5XcrDRHWdsTRnn9hmH1eeepg082gZQbKWxLIGvmZRd+NpYymxUK5Zl38c+BrEYNdjTukjoW4utjXRYiL33n6ux98onnnyw7hwwG71nP3DdhlYcbVfOM+1Q5V1+oNeDZKkrlW8INjC8/lyexlYckHa+H25GtmjuXi3G5USg2S1Wi0uvlSq9dYgUYrq9p9qlZBOjIW91SDnHWCtVCqHrsvUpaTrmkiZj3HoSXUEXn+skydVEIPT90ytWQX8bNuR7QDBM49TzUa41xHYWtZ7/V/qqFrvlB++4s2dlafcfEOadOyIqK++ymbPMFnwOaCuP+Vdug0HyVY11x6BybdzGnFwhiMzZ2A+Hk/ZURkhEGIw86giexVgenZiBDHnfitAU40aNeuGRmooVkqaDbpW/T+NwAr8v0Gcd6PhV5yTFC95rnPj4vTohwv1ijk11Zs+pdVBQUqQvHDxbBdyMJUkcyk8NTxZN7ZHl69GrhKJ7PgTYsM2xDdG9t0ka0Z+NKAF/ErlmZxp00M6LKCWrtATG0xM8+orXCmrQU4S8jzWL8292unoV2UANuLeaFb1KnUKdJxGb3ue1j529z3bn4t239BifKSA3jNUXIq7JL9RY0lNOO/4lQ5H22sxlXEAzucDmwkGx0lpvC5RVbb01csyypEkL1JYK/tQblRwEbg9lNPUj8JZGoO9WkD/ck+z/njj+0E+AABB8tya2Vf7z5Hx6Ncifxkg8q8nHhqegGuf9DcgD/IWrDeZc/4IMbXbYu9ZPOWWHTdelcLYh+L82WbmyvcIgIbRH2NvM+pakubYH4vOp39itD1uI+BBQW3UUk3Da37QCzUZDX1JS8PNwgR1fjijnlYrHg8Vo1PPa9yjYD0ZRyqBbEBNmLAOx8TX2RBYU1yzWfqj9NbaMel4bs7dyGPTcbck7Ejtr3Ae+QvnC5kUAkSwdQIRiZAJo0BUZlkW1iUliX3F9+6J2DErEzFXr0ZEYBJXxrBBkPiYpQiqcWphFVlsWhxbRJbeeo3TUgyKnn1gtvkJViTCzk2eiERl20fddugcMjODYJxbgNPYJ7ojMmNcMWYnEtbWyxro7R2TdEjGlhoU16o6C6YFO26TFf4KMiDZHlJEs0ARsKCxDxAAS3PCc2YGmOh26IZfFXbJdq8Ednvd+aEmrOYcosCqZrCsceLFsn9eJG6wDPmeSr2VIQiNunjwPmLHQ4ZxfwGAbYq9j3VJRhAMhLDJCAYqI+7RE2Ivs5/4I2GA2UdYSrBCCXJiP7OX2HWA2MtqbutUN9UKSDmB6xDqNxL6bEAGzD7is9uo55MX6Ppvi7fnFwNFRfiD3jXDWKfCUKi6qT0XY7QSQtWhToVYww1F7wNlBHooG/nmn3++QaDQDAV5mm6OAkrLWBwFCZXLQGks2d62mFWuHa3evYobCdNV0wk3FB2vOh43AVkxdDiXD7RF8VX8sZBrwniUHcOz6/o24v6YP0lFGou8T3/8p7B1Z8Q2npQkOpjXZDiLLHNiau9KnuzbYUO4G4OToIhM0m8vbBhYMflR0nLPjAAb7XiAb+EwXesIN6D46y0JAN9tYPchoexbtn22A+xQ9oCtyeR90dtINFv7KtYQQglrKvqsZqLj6A94vzA0FttEUrnkDrUuglfv/LhgbtVcFaeA5rQ9ZTrCMc7H+5PxVb5to1zNicFsSXruJWXOC5fRM2TY3/JkjRwbfnpkDR4+l2+z2zX2/QkZPwgkOXg8efz7p97f6x3xAB5Sr+f985ICn19+/ff0weqbf02TeibVkqc/yAjtFRZTO70DbyF0SEye47Qrw9HDV2g/0SiiJ9EOIf9ERuyirdkAc9bYq1kdahQmRAZk7nj3chBEektlwVkEyFBcoodMnxU1jpFRS50kTyv00CMryEAIzpIRoaWLrxb4kdXz0zUgChQk0CIX+KwchZp/up0AlS2AEo0WJsxKzJ3ocSch0d4+Drs7TCULrbRlGZQ0qjQ+qbQs0X04MZFKSUwaGkpImmPJX70LdMwoXZAIKe5KKitLcFcye05C0tCdeHsp1IRE3srlY7HNxNhD5OTkjRlV8/sK5igCCh2+qWZUSsKCFggVx3YaGw2bPlSrPdzRAgEKAnjppa83JFUa1S8lmuLrjwryX6Vf/VpVH1KHfn3oy0O/tlLp1a99lf5mnwry3P35PFB5+9UlB1KwCniH/m0i8/8ThH75Z+hZa+per4LoSEGrxGcLz3Fu3HvRh/Q3HodS36SCUO/dtw8/4FlC77TQqLSimbf0bSWQkcCv1ezTqK2LgMBovZjEVfFPDN8JrhlGHECw88/OywIbMhuSg0pJfDISZ0MO8z11fh600grlQ6ZqnIcxYBuboHy7Mvgs/Su/EaPzUCSRsbUuqK5XafI7QkC0iagA7bbrRlGwKhhVtxAoK9QC9ZpkbwFK08rAbQ8ynrII07WQQ7Htk4/afXEQ+fNPJI3BBSizFFMfOqI7xHX04x8cPhynJ/7gPi5/geC9BeJHH/YLzcK+vXt7dn9QUK+ImzbgYL89e8L1OuLhdb8QFZPItqiCkwVucnafc59LmAEIY4xP0SeHUChmvi5RH2NBoaFnWvIUZeZUop1rogsnYScKYKarIaVFn6BXzldDd+LDPac85jtVCyW4qk2Ur5Qp6gzFFOfS5TljZrggxyfed8N+R5DJ1/AxF0aayMJwwaw7c2k1xm855kQ/vCG/1I9ZVGCE1ICaj1l2GGoUMFPFqUwBZv/x+xPhlOhAtZ8AVO4B5ur9JlGBw0BweOKSdPI31CwOTV4YbiwWzpP++/cXEZY8GFFgXyBa3AlZKjdgwkM0USpnjRsEYi3GbMCrFFpqUrrzMUL3ulUrXE7TRH9Kgdu+ll2KV6IcK4zRFycWcBJZV+dgOHtb7xodMrXz0VonJSgEDflQMgakVekKbPXMRB6GRHVTFjhWpeTuW+8dXwqspiTvlxalICrdkPG/vN+d9mpNV7h6L9Xor6X8OGKM0f0Ut9TbVVEyaZRAaYnRj2R9zajRVW3drmJWCheqRAu9Rdsz9CxlZbppVzZIzVe9qw01eKfFu2cFJbPa8dhUG+k1macttbbBQxp/zXdx34X4hfz/X+XtuHi+vbtLOWqszzUkLVtSsCQ7XGf4U+sXZq6+5MHKUO4Ip9TD10Pv6nfUL1zvtzeMq6Sog0uz/Ir3yV+Wcf8F7Yoawt2za+FfW1d/x/ui7UYkwLml/O2mGEOhUwOvG1uEC2WEz9SJjkR0BVUmrMU5U8sqg5qd8TU4rvNd5wi/sqyEmzwfxW9wg6j4dQLYhn8/6KO7syqCssK5CXVryslM8MoU5KPcfJdMXZFSEJkZzzd4ye8Fhf+c56y+r6AvThzz7CwQgKXgqx8DD5/y5GUxmP2O64DNCj4lmAZ1iKhp+XxSCkmg6eG7l0SJUjZtY28AyvWCXvZaENkyp7LHNiUi2SEmQ2UQhMbG2V5P4V8Pue57Lux8Oxtt82xLZU+tMvfcidqX0nVyjtzHhR30Evc74+tPGOjkYA3E+A33jmWHBMBW5pOQDRydRsfuZWv0OpzKHo0R0eKU0W22G1Tr+U42ES1zXuDlkXfTtVLW/j3pLyIDUr1s7RVdndwHAfdNXpQewXYydSy6xEdGPm06sJq9qpPuT5yrmEs9iiWtjtjI3vw+2IE9dvxkPj/co0QtSgGSiQDKbNgfAyFgHXcG+xk7wz1L445pN7ov95j9qtV9A01Ci0YMh+ZDj6b7LG6+RFPQ2i11iS5Fcqndia7lXXsOq8we4mBesCRYJpGpJWqe+mdV4s3uwTof3aH75Cn2JNmHPMn+QiokfWFPkxTurpNkBWm6XH5PTpH/2FFZvqxP7MlOn05HkguL1HSrgt12mvTdDoHTKTklCHrR7rUa6WP3/Oqi98WBnoU+AnWNxJAmSe/jKPbT1lJTprHM6DWUjqktY0RG/xL2S+sk5Ug2VF+PyTYqEBkYmqBsiA3v4aFzczdkuifoXO/EQHl5kCyGJs800LaElE+aJBYQx9mTJK22c4w9Ts4nfx7Zsc78mcGO1DX6fvcu5i5Vu5m743WYu6KZoLz+PVhpnXy9Eno9qxCXIdbmx4i9A/Yx9pFQ9Lnx6ABES28geBzyLXIDj7+BWIiP+voWj8sbJ/Sz+gndU0ZPV2JFP3MgZfSxGNZRSnAweRMpJIQcgn6d8ERDE4qrVhXlJKSSFzI0OYuj2qU4oZBvly85Ij8q//9cuaN86ZB8WC775T6Wxx3d0oKoGWvHHfXWce+LRxDYPj880s2I13rGSO+qn/PDEmmNi3HWRb72w+rf5ZWjhgVVFcIuurELyK9JuVrDyeYmGLFDv4srM8q4TqdYxylODDbmVvhOxytw91AxiVBasUZHMS3XifOt4E4iwvFRYPagJfBGf4vl6L3jt1Ee0rOXq6X79wc9q4h+7aEMWu6vvkhRbO2dOlaeJVRwLoWW4CMlT7WqHKHf5xXnlYdWfPa7vgq0qqcSfGRoySWOoopv3IWR5OltNDltF0MHmc1QGrq1Hx36fJJGm3yeCRCL1CxxptKvaDcT5+7QWWlS40VxqnBlfJSH3cCj6otRK+PVLbe5iZBIiBg3BXAa5tIehqemYIzDE1C2RxCEfp2Mp4l3fjq+i9zBvD4B7wL5aUc7ywe5WWK+dqMPL2Zehal6jkiz8kiEN+2w3c67e9NAx1ADUzUkkIpxlceiPJ6mGtxyk7rJtf5yuf+qt0X29PjKinsEeKzNZFu1xkEVmERLK2iflmLxgp5imW/Ri0mn2wvSaEmBKgdNwdFJG8tNvM5QqSAoTAbt9tYxjRL//yFtyq8IFzq71T8QyAQHPYuiCOW7iiMZ79y8glUaH5n3w45FapxvE5X12tnB+Y3TkM8+W2bs6p0c5pS1t3d24H925PI4hBmrkw+IlooGgM7aw9lqjMVajN5WYbRQIop6LplR0CU0X5E4StKq0xEkxNy4VWLdmCghhAgWd0Da3Fwt1OG0A5BWEi3hdxzw83w8kNHWJWmT0VkMI4MlZM4YZ5g9u4wM8ZUd3UhnCsXA+ZV1LquqHNuAra+scGS5skqrkRqkobic9Uq1CTM4hGmdtOiubJwnsP6txBlzoGgoJicPhTRQTh7DOD4/vsVjBPz1zmLZurVI3RWbty4yW8xizGeY1O5TQCa11jTI9tyDNhgtut01x12esjFXhEoS4QOgi6+feaSUxDXM/oqvBYJN/hcC2pdD1R2vbxzBoiXMXjXyeLRn7737TrXsxh/vqM4EqvrXNvbEe7KZp24VThY2lxE1Ayi+oXTlzvzDUaoNz+2io+xVXBC757jPOdIBrEQnwXblItkMC2u+UL+XEcWJcuAq78Zs26PelLeovRElvv5gz0wGJ/uKsetzIRRSr08thotw64swKOZenDjyR+JCu6kDPZBmzuJ8ViGiaGp0SvEovfNdeHwhYjg+deKu+e1ge+363uTnwL+zPDOepZThLchwJmuRiJrlpXGqX53pmMwjiTNw71OqhJv2/qnyKnyVlLD9K/EpZrB11WIepgTDu8waI/qTEw8vB2Ii5Y4D31numO6xu9TuxtZlB+4wqeShrd5n3qRpqFVrejJX9kn4wwc4jZMLUGZfyc2bNOEXrjgnqcPLOz/G/Pf6/BKjB9kQSrLJuzRKkdqitm4zHDQ8et1GnN/TqQol+PuaUp0doE3gcL+4/+P2xW1682tPu2d9qeIqZfMFi3jx3c4TLIeGQGJ4JVp7fG2Fb32jqj6iwviX8DSnxOc/ZbVyYef6yvx41ZQLVdU+f3EXDBCudPfse+o3Qj7Q9tTr00DnSZZ1Qi6qVdjFWjU15zou72/N8+1ordaqmCNcKntS8N5sO2lrfvF6iY156+aOkp1HrU1fp/k5l9cSJfz2a1dt0na+hLh25MoZ5rwg5oTyhC8j2qeyuROcCDqhaA0JqiGlga0paW29DokbtMDnz8MtRsvXcuoewuVi70Gx7iEMkYQSB9g/2ymSFDZCH6xPZKLCDgsfKQr8HKgG888Dq08u31x+zxZ4kbAIMwTA7HD6KhxJd7FyLGzt2sRquCq7nlxEGf1hlza5AS7fpVc+glNbN3BVmejGBpwyZny9erO1GR4QGXvnumlwjY5dLsi3cOwuR+QEnHG/rXwQLibbSTq8aDTxKKsKZR+zs4C4H16+yzZ5C15yzObgC1f+H7R3kP097J9HD/2VQEaAN/PJy8l/bWMWbDYL5PR/Zmp2CwTAfz0lc7Qk92f5uWSj58uFgzCvvSjRfA1mJQ4q+YHGAGCO5i8sVY251z4tuQzWSO4ScdfsrN51yApxbt9qgScmDrgDrxkDwL9N2wGYJe0sMLW/JltYi5GQKbjjMQAP7BHmjZ2LCMa6jccCMvBFHMZGjCcBV6DpiwxsQBWAAYQQ/11nriLjIcAAJ8djAA1cRZiMHUcEYyfHYwEHTBs4NoDg8SSQCtkkJA/LKPM3ee1BRshE2gtU5LQfEZPF8X+B4VJ6UnIG+wc+IDlx9PB6PfY9OPAqYkJjTjFqoT1V4p01DJQlidpTDiruLMfUL3tP813sTlE1SkZtHmSMJ8+EtN8vKnL6hmOS++x/geFS+pIzfNrvP/ABn7hwtHMQyL/nTugMTQmGxpxEorQIT+6pEt4RDn9T7iah5veVg4o7VsKpX+z9C9KifKffrG437uI7U++FLyKSxKRIkyFL7o8Bf0ugSIkylXyhWCpXqrV6o9lqd7q9/mA4Gk+ms/liuVpvtjtzyDDqRcZoiGd1yWGuSlLFCtW59eTMzGOJm8AYLCp2//mqJ+6xBXe21IDfROxQusGKOZeWKaPaapwzq8GydMry9YDZ3fP3mEpKUdI0pW5TIlfTXHvRM6zniSjNk0hnEkcRVM/NhIpVTfXZoouzAjRfq9KaYGWPbgmKc3l3yoZJTl1lcivo6qqZZJn1O73gPfnr8kUzTshKc1wYST0rYA8KT16j09xyx/vCn0Q8loOFYVOldfJV6kBN9RTUvry2+XHAmkH2PGXV811wZCLrUd96NDau3zwl6DjXavrCFfRwDpbaeV2blpE0SEzW4fZ89M0B5i1gSpPvn+cHny9idVx8zkizdAsJ6zjbY7Y4xJ0GRiMA') format('woff2'),
  url('#{$--font-path}/vue-jd-ui.woff') format('woff'),
  url('#{$--font-path}/vue-jd-ui.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  // url('#{$--font-path}/vue-jd-ui.svg') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconeditf:before {
  content: "\e6ab";
}

.iconduigou:before {
  content: "\e635";
}

.iconplus:before {
  content: "\e634";
}

.iconclock:before {
  content: "\e972";
}

.iconic_wrong:before {
  content: "\e63a";
}

.iconrili:before {
  content: "\e60e";
}

.iconsuishicunqu:before {
  content: "\e60f";
}

.iconyouyiwen_hover:before {
  content: "\e610";
}

.icontixianzhong:before {
  content: "\e611";
}

.iconhuodongtixing:before {
  content: "\e612";
}

.iconzhuanchu:before {
  content: "\e613";
}

.iconzidingyibaobiao:before {
  content: "\e614";
}

.iconbox:before {
  content: "\e615";
}

.iconliudongxing:before {
  content: "\e616";
}

.iconyouyiwen:before {
  content: "\e618";
}

.iconyuebao:before {
  content: "\e619";
}

.iconzhuanzhang:before {
  content: "\e61b";
}

.iconnote_hover:before {
  content: "\e61c";
}

.iconok:before {
  content: "\e61d";
}

.iconpop_hint:before {
  content: "\e61f";
}

.iconnote:before {
  content: "\e621";
}

.iconkefu:before {
  content: "\e622";
}

.iconchangshayinhang:before {
  content: "\e623";
}

.iconzijinbuguozhang:before {
  content: "\e625";
}

.icondaibanshixiang:before {
  content: "\e61a";
}

.iconpop_error:before {
  content: "\e620";
}

.iconlinghuodaozhang:before {
  content: "\e627";
}

.icongaoyuyinhang:before {
  content: "\e628";
}

.iconchanpinfuwuxuanzhong:before {
  content: "\e617";
}

.iconzhanghushezhixuanzhong:before {
  content: "\e61e";
}

.iconbangzhuzhongxinxuanzhong:before {
  content: "\e624";
}

.iconzichanguanlixuanzhong:before {
  content: "\e626";
}

.iconbangzhuzhongxin:before {
  content: "\e629";
}

.iconchanpinfuwu:before {
  content: "\e62a";
}

.iconzichanguanli:before {
  content: "\e62b";
}

.iconzhanghushezhi:before {
  content: "\e62c";
}

.iconarrowright:before {
  content: "\e62d";
}

.iconarrowleft:before {
  content: "\e62e";
}

.iconfuzhi:before {
  content: "\e62f";
}

.iconeye_show:before {
  content: "\e630";
}

.iconerror:before {
  content: "\e631";
}

.icontongzhi:before {
  content: "\e632";
}

.iconeye-clouse:before {
  content: "\e633";
}

.iconweibo:before {
  content: "\e601";
}

.iconOK:before {
  content: "\e636";
}

.iconyiwen:before {
  content: "\e637";
}

.iconyiwen1:before {
  content: "\e638";
}

.iconanquan:before {
  content: "\e639";
}

.iconerror1:before {
  content: "\e63b";
}

.iconxian:before {
  content: "\e63c";
}

.iconbiaoge:before {
  content: "\e63d";
}

.iconxian1:before {
  content: "\e63e";
}

.iconbiaoge1:before {
  content: "\e63f";
}
</style>
