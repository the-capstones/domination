
// This battle matrix was created assuming the attacker rolls 3 dies, the defender rolls 2 dies,
// and the maximum number of units on a territory is 15.
// ----------
// The first key in the object is the number of units the attacker has.
// ----------
// The second key represents the number of units the defender has.
// ----------
// In the last section, you'll see the expected chance of the attacker winning that engagement
// and the expected number of units he would have if he went through with the attack across
// all win or lose outcomes.

const battleMatrix = {
  1: {
    1: {
      ChanceToWin: 0.4598765432098766,
      ExpectedUnits: 0.4598765432098766
    },
    2: {
      ChanceToWin: 0.2114864349946655,
      ExpectedUnits: 0.2114864349946655
    },
    3: {
      ChanceToWin: 0.09725765066112704,
      ExpectedUnits: 0.09725765066112704
    },
    4: {
      ChanceToWin: 0.04472651218675287,
      ExpectedUnits: 0.04472651218675287
    },
    5: {
      ChanceToWin: 0.020568673814278328,
      ExpectedUnits: 0.020568673814278328
    },
    6: {
      ChanceToWin: 0.009459050612121826,
      ExpectedUnits: 0.009459050612121826
    },
    7: {
      ChanceToWin: 0.004349995497549853,
      ExpectedUnits: 0.004349995497549853
    },
    8: {
      ChanceToWin: 0.0020004608923917533,
      ExpectedUnits: 0.0020004608923917533
    },
    9: {
      ChanceToWin: 0.0009199650400196644,
      ExpectedUnits: 0.0009199650400196644
    },
    10: {
      ChanceToWin: 0.00042307034247817906,
      ExpectedUnits: 0.00042307034247817906
    },
    11: {
      ChanceToWin: 0.0001945601266334836,
      ExpectedUnits: 0.0001945601266334836
    },
    12: {
      ChanceToWin: 0.00008947363848268228,
      ExpectedUnits: 0.00008947363848268228
    },
    13: {
      ChanceToWin: 0.00004114682757382611,
      ExpectedUnits: 0.00004114682757382611
    },
    14: {
      ChanceToWin: 0.00001892246082870399,
      ExpectedUnits: 0.00001892246082870399
    },
    15: {
      ChanceToWin: 0.000008701995874928687,
      ExpectedUnits: 0.000008701995874928687
    }
  },
  2: {
    1: {
      ChanceToWin: 0.7082666514250877,
      ExpectedUnits: 1.1681431946349643
    },
    2: {
      ChanceToWin: 0.43994400366174236,
      ExpectedUnits: 0.6514304386564078
    },
    3: {
      ChanceToWin: 0.25485106608424957,
      ExpectedUnits: 0.3521087167453766
    },
    4: {
      ChanceToWin: 0.14135786567665104,
      ExpectedUnits: 0.18608437786340393
    },
    5: {
      ChanceToWin: 0.07611678982506084,
      ExpectedUnits: 0.09668546363933918
    },
    6: {
      ChanceToWin: 0.04011338129955366,
      ExpectedUnits: 0.049572431911675485
    },
    7: {
      ChanceToWin: 0.020796737733656548,
      ExpectedUnits: 0.025146733231206402
    },
    8: {
      ChanceToWin: 0.010644427711368464,
      ExpectedUnits: 0.012644888603760217
    },
    9: {
      ChanceToWin: 0.005392017317893032,
      ExpectedUnits: 0.006311982357912696
    },
    10: {
      ChanceToWin: 0.002708172500925134,
      ExpectedUnits: 0.0031312428434033127
    },
    11: {
      ChanceToWin: 0.0013505114962922983,
      ExpectedUnits: 0.001545071622925782
    },
    12: {
      ChanceToWin: 0.0006693953693889563,
      ExpectedUnits: 0.0007588690078716386
    },
    13: {
      ChanceToWin: 0.00033006359526041373,
      ExpectedUnits: 0.0003712104228342398
    },
    14: {
      ChanceToWin: 0.0001620089701815582,
      ExpectedUnits: 0.00018093143101026218
    },
    15: {
      ChanceToWin: 0.00007920427726902685,
      ExpectedUnits: 0.00008790627314395554
    }
  },
  3: {
    1: {
      ChanceToWin: 0.8424279753067603,
      ExpectedUnits: 2.0105711699417244
    },
    2: {
      ChanceToWin: 0.6250369412392353,
      ExpectedUnits: 1.2764673798956432
    },
    3: {
      ChanceToWin: 0.4250908666956472,
      ExpectedUnits: 0.7771995834410239
    },
    4: {
      ChanceToWin: 0.27184001737983143,
      ExpectedUnits: 0.45792439524323536
    },
    5: {
      ChanceToWin: 0.1661253111388288,
      ExpectedUnits: 0.262810774778168
    },
    6: {
      ChanceToWin: 0.09806331199724501,
      ExpectedUnits: 0.14763574390892048
    },
    7: {
      ChanceToWin: 0.05632982281166483,
      ExpectedUnits: 0.08147655604287123
    },
    8: {
      ChanceToWin: 0.031654069285270175,
      ExpectedUnits: 0.04429895788903039
    },
    9: {
      ChanceToWin: 0.017469318994248584,
      ExpectedUnits: 0.02378130135216128
    },
    10: {
      ChanceToWin: 0.009496477524089305,
      ExpectedUnits: 0.012627720367492618
    },
    11: {
      ChanceToWin: 0.005096650194260682,
      ExpectedUnits: 0.006641721817186464
    },
    12: {
      ChanceToWin: 0.002705386014160213,
      ExpectedUnits: 0.003464255022031852
    },
    13: {
      ChanceToWin: 0.001422418658272975,
      ExpectedUnits: 0.0017936290811072146
    },
    14: {
      ChanceToWin: 0.0007416418205692762,
      ExpectedUnits: 0.0009225732515795384
    },
    15: {
      ChanceToWin: 0.0003838437647743888,
      ExpectedUnits: 0.0004717500379183443
    }
  },
  4: {
    1: {
      ChanceToWin: 0.9148916533292687,
      ExpectedUnits: 2.925462823270993
    },
    2: {
      ChanceToWin: 0.7583343242682938,
      ExpectedUnits: 2.034801704163937
    },
    3: {
      ChanceToWin: 0.5783417160114631,
      ExpectedUnits: 1.355541299452487
    },
    4: {
      ChanceToWin: 0.4127929590345016,
      ExpectedUnits: 0.8707173542777369
    },
    5: {
      ChanceToWin: 0.27956197637480185,
      ExpectedUnits: 0.5423727511529698
    },
    6: {
      ChanceToWin: 0.18153029036840537,
      ExpectedUnits: 0.3291660342773258
    },
    7: {
      ChanceToWin: 0.11390658103991894,
      ExpectedUnits: 0.19538313708279015
    },
    8: {
      ChanceToWin: 0.06948007006132771,
      ExpectedUnits: 0.1137790279503581
    },
    9: {
      ChanceToWin: 0.04138784340472633,
      ExpectedUnits: 0.0651691447568876
    },
    10: {
      ChanceToWin: 0.024162568623518118,
      ExpectedUnits: 0.036790288991010736
    },
    11: {
      ChanceToWin: 0.013864618854629068,
      ExpectedUnits: 0.020506340671815535
    },
    12: {
      ChanceToWin: 0.007837255437709145,
      ExpectedUnits: 0.011301510459740996
    },
    13: {
      ChanceToWin: 0.004372451621655661,
      ExpectedUnits: 0.0061660807027628765
    },
    14: {
      ChanceToWin: 0.00241136608094544,
      ExpectedUnits: 0.003333939332524978
    },
    15: {
      ChanceToWin: 0.0013162537188159977,
      ExpectedUnits: 0.001788003756734342
    }
  },
  5: {
    1: {
      ChanceToWin: 0.9540309855945124,
      ExpectedUnits: 3.8794938088655058
    },
    2: {
      ChanceToWin: 0.8483306283967091,
      ExpectedUnits: 2.8831323325606464
    },
    3: {
      ChanceToWin: 0.7025032837441841,
      ExpectedUnits: 2.058044583196671
    },
    4: {
      ChanceToWin: 0.5460239416942013,
      ExpectedUnits: 1.4167412959719383
    },
    5: {
      ChanceToWin: 0.4021015838827972,
      ExpectedUnits: 0.9444743350357669
    },
    6: {
      ChanceToWin: 0.2829658543611348,
      ExpectedUnits: 0.6121318886384607
    },
    7: {
      ChanceToWin: 0.1916529752524536,
      ExpectedUnits: 0.38703611233524376
    },
    8: {
      ChanceToWin: 0.1256645233745307,
      ExpectedUnits: 0.23944355132488881
    },
    9: {
      ChanceToWin: 0.08014471166244455,
      ExpectedUnits: 0.14531385641933214
    },
    10: {
      ChanceToWin: 0.04990744304574031,
      ExpectedUnits: 0.08669773203675103
    },
    11: {
      ChanceToWin: 0.030439868251158776,
      ExpectedUnits: 0.0509462089229743
    },
    12: {
      ChanceToWin: 0.018231666885869646,
      ExpectedUnits: 0.02953317734561064
    },
    13: {
      ChanceToWin: 0.010745979628963797,
      ExpectedUnits: 0.016912060331726674
    },
    14: {
      ChanceToWin: 0.006244259348398439,
      ExpectedUnits: 0.009578198680923418
    },
    15: {
      ChanceToWin: 0.0035825279126671197,
      ExpectedUnits: 0.005370531669401462
    }
  },
  6: {
    1: {
      ChanceToWin: 0.975171057034073,
      ExpectedUnits: 4.854664865899579
    },
    2: {
      ChanceToWin: 0.9066615662577191,
      ExpectedUnits: 3.789793898818365
    },
    3: {
      ChanceToWin: 0.7963908889741741,
      ExpectedUnits: 2.8544354721708456
    },
    4: {
      ChanceToWin: 0.6611618279433246,
      ExpectedUnits: 2.077903123915263
    },
    5: {
      ChanceToWin: 0.5212373134044592,
      ExpectedUnits: 1.4657116484402262
    },
    6: {
      ChanceToWin: 0.3925413092915531,
      ExpectedUnits: 1.0046731979300139
    },
    7: {
      ChanceToWin: 0.2840368078815461,
      ExpectedUnits: 0.6710729202167899
    },
    8: {
      ChanceToWin: 0.19849622211386853,
      ExpectedUnits: 0.43793977343875734
    },
    9: {
      ChanceToWin: 0.13457179517251242,
      ExpectedUnits: 0.2798856515918446
    },
    10: {
      ChanceToWin: 0.08884259263490284,
      ExpectedUnits: 0.17554032467165387
    },
    11: {
      ChanceToWin: 0.05729791125479595,
      ExpectedUnits: 0.10824412017777026
    },
    12: {
      ChanceToWin: 0.036197316302444195,
      ExpectedUnits: 0.06573049364805485
    },
    13: {
      ChanceToWin: 0.022450452358435506,
      ExpectedUnits: 0.03936251269016219
    },
    14: {
      ChanceToWin: 0.0136971073684452,
      ExpectedUnits: 0.023275306049368616
    },
    15: {
      ChanceToWin: 0.008233985748811531,
      ExpectedUnits: 0.013604517418212994
    }
  },
  7: {
    1: {
      ChanceToWin: 0.9865893054967987,
      ExpectedUnits: 5.841254171396377
    },
    2: {
      ChanceToWin: 0.9434184586855674,
      ExpectedUnits: 4.733212357503933
    },
    3: {
      ChanceToWin: 0.8640054194895986,
      ExpectedUnits: 3.7184408916604443
    },
    4: {
      ChanceToWin: 0.7544448376359012,
      ExpectedUnits: 2.8323479615511644
    },
    5: {
      ChanceToWin: 0.6284839834985485,
      ExpectedUnits: 2.0941956319387747
    },
    6: {
      ChanceToWin: 0.5010458107015607,
      ExpectedUnits: 1.5057190086315746
    },
    7: {
      ChanceToWin: 0.3838341579438387,
      ExpectedUnits: 1.0549070781606285
    },
    8: {
      ChanceToWin: 0.2837287913690071,
      ExpectedUnits: 0.7216685648077643
    },
    9: {
      ChanceToWin: 0.2031655989789306,
      ExpectedUnits: 0.48305125057077514
    },
    10: {
      ChanceToWin: 0.14141706160175715,
      ExpectedUnits: 0.316957386273411
    },
    11: {
      ChanceToWin: 0.0959823353341024,
      ExpectedUnits: 0.20422645551187266
    },
    12: {
      ChanceToWin: 0.06369104419046391,
      ExpectedUnits: 0.12942153783851873
    },
    13: {
      ChanceToWin: 0.04141603317008064,
      ExpectedUnits: 0.08077854586024283
    },
    14: {
      ChanceToWin: 0.026444391147590365,
      ExpectedUnits: 0.049719697196958984
    },
    15: {
      ChanceToWin: 0.01660852403405291,
      ExpectedUnits: 0.0302130414522659
    }
  },
  8: {
    1: {
      ChanceToWin: 0.9927565693269746,
      ExpectedUnits: 6.834010740723352
    },
    2: {
      ChanceToWin: 0.9661078984558442,
      ExpectedUnits: 5.699320255959777
    },
    3: {
      ChanceToWin: 0.9109599545697548,
      ExpectedUnits: 4.629400846230198
    },
    4: {
      ChanceToWin: 0.8264224685715315,
      ExpectedUnits: 3.6587704301226958
    },
    5: {
      ChanceToWin: 0.7195112497821119,
      ExpectedUnits: 2.813706881720887
    },
    6: {
      ChanceToWin: 0.6015129416367514,
      ExpectedUnits: 2.107231950268326
    },
    7: {
      ChanceToWin: 0.4839395245186643,
      ExpectedUnits: 1.5388466026792929
    },
    8: {
      ChanceToWin: 0.37580101124339044,
      ExpectedUnits: 1.0974695760511548
    },
    9: {
      ChanceToWin: 0.2825565756067162,
      ExpectedUnits: 0.7656078261774912
    },
    10: {
      ChanceToWin: 0.2063238134126797,
      ExpectedUnits: 0.5232811996860908
    },
    11: {
      ChanceToWin: 0.14672579284556864,
      ExpectedUnits: 0.35095224835744127
    },
    12: {
      ChanceToWin: 0.10187677736825887,
      ExpectedUnits: 0.23129831520677763
    },
    13: {
      ChanceToWin: 0.06922051121181998,
      ExpectedUnits: 0.14999905707206285
    },
    14: {
      ChanceToWin: 0.046116125374657,
      ExpectedUnits: 0.09583582257161599
    },
    15: {
      ChanceToWin: 0.030178377737013748,
      ExpectedUnits: 0.06039141918927965
    }
  },
  9: {
    1: {
      ChanceToWin: 0.9960876531858659,
      ExpectedUnits: 7.830098393909218
    },
    2: {
      ChanceToWin: 0.9798948844273665,
      ExpectedUnits: 6.679215140387144
    },
    3: {
      ChanceToWin: 0.9426615118190885,
      ExpectedUnits: 5.572062358049288
    },
    4: {
      ChanceToWin: 0.8798780779662412,
      ExpectedUnits: 4.538648508088937
    },
    5: {
      ChanceToWin: 0.7932601923729612,
      ExpectedUnits: 3.6069670740938475
    },
    6: {
      ChanceToWin: 0.6896930044753198,
      ExpectedUnits: 2.7969249547436457
    },
    7: {
      ChanceToWin: 0.5785607236345368,
      ExpectedUnits: 2.1174073263138298
    },
    8: {
      ChanceToWin: 0.4690454468800536,
      ExpectedUnits: 1.5665150229312088
    },
    9: {
      ChanceToWin: 0.3683184330750201,
      ExpectedUnits: 1.1339262592525114
    },
    10: {
      ChanceToWin: 0.280821339121605,
      ExpectedUnits: 0.8041025388076957
    },
    11: {
      ChanceToWin: 0.20839318912676752,
      ExpectedUnits: 0.5593454374842087
    },
    12: {
      ChanceToWin: 0.1508611766029473,
      ExpectedUnits: 0.38215949180972486
    },
    13: {
      ChanceToWin: 0.10676513819722976,
      ExpectedUnits: 0.2567641952692926
    },
    14: {
      ChanceToWin: 0.07400718374063113,
      ExpectedUnits: 0.16984300631224714
    },
    15: {
      ChanceToWin: 0.0503342175350143,
      ExpectedUnits: 0.11072563672429396
    }
  },
  10: {
    1: {
      ChanceToWin: 0.9978868497145881,
      ExpectedUnits: 8.827985243623806
    },
    2: {
      ChanceToWin: 0.988168967229206,
      ExpectedUnits: 7.66738410761635
    },
    3: {
      ChanceToWin: 0.9635893231033709,
      ExpectedUnits: 6.535651681152658
    },
    4: {
      ChanceToWin: 0.9183749160076988,
      ExpectedUnits: 5.457023424096636
    },
    5: {
      ChanceToWin: 0.8507975189827623,
      ExpectedUnits: 4.45776459307661
    },
    6: {
      ChanceToWin: 0.763781191702511,
      ExpectedUnits: 3.5607061464461567
    },
    7: {
      ChanceToWin: 0.6637392722213534,
      ExpectedUnits: 2.781146598535183
    },
    8: {
      ChanceToWin: 0.5585805702622961,
      ExpectedUnits: 2.125095593193505
    },
    9: {
      ChanceToWin: 0.4558155270284626,
      ExpectedUnits: 1.589741786280974
    },
    10: {
      ChanceToWin: 0.36129706133807166,
      ExpectedUnits: 1.1653996001457674
    },
    11: {
      ChanceToWin: 0.27871009332276353,
      ExpectedUnits: 0.8380555308069723
    },
    12: {
      ChanceToWin: 0.20965589447741348,
      ExpectedUnits: 0.5918153862871384
    },
    13: {
      ChanceToWin: 0.1540821835233002,
      ExpectedUnits: 0.4108463787925928
    },
    14: {
      ChanceToWin: 0.11083179783836641,
      ExpectedUnits: 0.2806748041506135
    },
    15: {
      ChanceToWin: 0.07815563563703269,
      ExpectedUnits: 0.18888127236132668
    }
  },
  11: {
    1: {
      ChanceToWin: 0.9988586379631262,
      ExpectedUnits: 9.826843881586932
    },
    2: {
      ChanceToWin: 0.993084896054373,
      ExpectedUnits: 8.660469003670721
    },
    3: {
      ChanceToWin: 0.9771536452320725,
      ExpectedUnits: 7.512805326384731
    },
    4: {
      ChanceToWin: 0.9454058748176732,
      ExpectedUnits: 6.402429298914309
    },
    5: {
      ChanceToWin: 0.8943056826228908,
      ExpectedUnits: 5.352070275699501
    },
    6: {
      ChanceToWin: 0.8238063433912024,
      ExpectedUnits: 4.384512489837358
    },
    7: {
      ChanceToWin: 0.7373503635926837,
      ExpectedUnits: 3.518496962127867
    },
    8: {
      ChanceToWin: 0.640792604849423,
      ExpectedUnits: 2.765888198042927
    },
    9: {
      ChanceToWin: 0.540882146149795,
      ExpectedUnits: 2.1306239324307685
    },
    10: {
      ChanceToWin: 0.4438840293533552,
      ExpectedUnits: 1.6092836294991228
    },
    11: {
      ChanceToWin: 0.3546697120530112,
      ExpectedUnits: 1.1927252428599835
    },
    12: {
      ChanceToWin: 0.27634434762163224,
      ExpectedUnits: 0.8681597339087708
    },
    13: {
      ChanceToWin: 0.21030768491439553,
      ExpectedUnits: 0.6211540637069883
    },
    14: {
      ChanceToWin: 0.15657842492002302,
      ExpectedUnits: 0.43725322907063663
    },
    15: {
      ChanceToWin: 0.11422043688152597,
      ExpectedUnits: 0.3031017092428526
    }
  },
  12: {
    1: {
      ChanceToWin: 0.9993835235911948,
      ExpectedUnits: 10.826227405178127
    },
    2: {
      ChanceToWin: 0.9959814871129731,
      ExpectedUnits: 9.656450490783696
    },
    3: {
      ChanceToWin: 0.9858121280723632,
      ExpectedUnits: 8.498617454457094
    },
    4: {
      ChanceToWin: 0.9639877628885027,
      ExpectedUnits: 7.366417061802812
    },
    5: {
      ChanceToWin: 0.9263508368191125,
      ExpectedUnits: 6.278421112518614
    },
    6: {
      ChanceToWin: 0.8709641505540346,
      ExpectedUnits: 5.255476640391394
    },
    7: {
      ChanceToWin: 0.7987962100656659,
      ExpectedUnits: 4.3172931721935335
    },
    8: {
      ChanceToWin: 0.7134547566309457,
      ExpectedUnits: 3.4793429546738723
    },
    9: {
      ChanceToWin: 0.6202442417105147,
      ExpectedUnits: 2.750868174141284
    },
    10: {
      ChanceToWin: 0.524987954171727,
      ExpectedUnits: 2.1342715836708495
    },
    11: {
      ChanceToWin: 0.43299507648450575,
      ExpectedUnits: 1.6257203193444894
    },
    12: {
      ChanceToWin: 0.3483843433017235,
      ExpectedUnits: 1.216544077210494
    },
    13: {
      ChanceToWin: 0.2738059012731388,
      ExpectedUnits: 0.894959964980127
    },
    14: {
      ChanceToWin: 0.2104885915144352,
      ExpectedUnits: 0.6477418205850716
    },
    15: {
      ChanceToWin: 0.15849190305955138,
      ExpectedUnits: 0.4615936123024039
    }
  },
  13: {
    1: {
      ChanceToWin: 0.9996670266310466,
      ExpectedUnits: 11.825894431809173
    },
    2: {
      ChanceToWin: 0.9976763802864081,
      ExpectedUnits: 10.654126871070105
    },
    3: {
      ChanceToWin: 0.9912682193683281,
      ExpectedUnits: 9.48988567382542
    },
    4: {
      ChanceToWin: 0.9765334049116325,
      ExpectedUnits: 8.342950466714447
    },
    5: {
      ChanceToWin: 0.9494286227628934,
      ExpectedUnits: 7.227849735281508
    },
    6: {
      ChanceToWin: 0.9070481207982324,
      ExpectedUnits: 6.1625247611896246
    },
    7: {
      ChanceToWin: 0.8485787245692334,
      ExpectedUnits: 5.165871896762766
    },
    8: {
      ChanceToWin: 0.7755950999111549,
      ExpectedUnits: 4.254938054585027
    },
    9: {
      ChanceToWin: 0.6916864573643352,
      ExpectedUnits: 3.442554631505619
    },
    10: {
      ChanceToWin: 0.601648685577703,
      ExpectedUnits: 2.735920269248553
    },
    11: {
      ChanceToWin: 0.5105549152335016,
      ExpectedUnits: 2.1362752345779907
    },
    12: {
      ChanceToWin: 0.422962785332166,
      ExpectedUnits: 1.6395068625426603
    },
    13: {
      ChanceToWin: 0.3423996535137205,
      ExpectedUnits: 1.2373596184938476
    },
    14: {
      ChanceToWin: 0.2711513947108385,
      ExpectedUnits: 0.9188932152959102
    },
    15: {
      ChanceToWin: 0.21030136064086508,
      ExpectedUnits: 0.671894972943269
    }
  },
  14: {
    1: {
      ChanceToWin: 0.9998201532729418,
      ExpectedUnits: 12.825714585082116
    },
    2: {
      ChanceToWin: 0.9986622511968819,
      ExpectedUnits: 11.652789122266984
    },
    3: {
      ChanceToWin: 0.9946685611660272,
      ExpectedUnits: 10.48455423499145
    },
    4: {
      ChanceToWin: 0.9848733378804746,
      ExpectedUnits: 9.32782380459492
    },
    5: {
      ChanceToWin: 0.9657288158262245,
      ExpectedUnits: 8.193578551107732
    },
    6: {
      ChanceToWin: 0.9340339959808559,
      ExpectedUnits: 7.096558757170482
    },
    7: {
      ChanceToWin: 0.8878775993850986,
      ExpectedUnits: 6.053749496147864
    },
    8: {
      ChanceToWin: 0.8272311876322327,
      ExpectedUnits: 5.08216924221726
    },
    9: {
      ChanceToWin: 0.7540202993702312,
      ExpectedUnits: 4.19657493087585
    },
    10: {
      ChanceToWin: 0.6717208166116577,
      ExpectedUnits: 3.4076410858602104
    },
    11: {
      ChanceToWin: 0.584671332843916,
      ExpectedUnits: 2.720946567421907
    },
    12: {
      ChanceToWin: 0.49732875316762004,
      ExpectedUnits: 2.136835615710281
    },
    13: {
      ChanceToWin: 0.41364791231506526,
      ExpectedUnits: 1.6510075308089125
    },
    14: {
      ChanceToWin: 0.3366822006341371,
      ExpectedUnits: 1.2555754159300474
    },
    15: {
      ChanceToWin: 0.2684209444489528,
      ExpectedUnits: 0.940315917392222
    }
  }
};

// console.log(
//   'The chance to win a fight with 2 attackers against 1 defender is ',
//   (battleMatrix[2][1].ChanceToWin * 100).toFixed(2),
//   '%'
// );

module.exports = battleMatrix

