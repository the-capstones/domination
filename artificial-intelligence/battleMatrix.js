
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

const battleMatrix = 
{1:
{ 1:
   { ChanceToWin: 0.4715792181069959,
     ExpectedUnits: 0.4715792181069959 },
  2:
   { ChanceToWin: 0.22238695895040558,
     ExpectedUnits: 0.22238695895040558 },
  3:
   { ChanceToWin: 0.10487306821902485,
     ExpectedUnits: 0.10487306821902485 },
  4:
   { ChanceToWin: 0.04945595951120938,
     ExpectedUnits: 0.04945595951120938 },
  5:
   { ChanceToWin: 0.023322402717027367,
     ExpectedUnits: 0.023322402717027367 },
  6:
   { ChanceToWin: 0.010998360437672241,
     ExpectedUnits: 0.010998360437672241 },
  7:
   { ChanceToWin: 0.005186598215656393,
     ExpectedUnits: 0.005186598215656393 },
  8:
   { ChanceToWin: 0.0024458919311743815,
     ExpectedUnits: 0.0024458919311743815 },
  9:
   { ChanceToWin: 0.001153431804477425,
     ExpectedUnits: 0.001153431804477425 },
  10:
   { ChanceToWin: 0.0005439344684952055,
     ExpectedUnits: 0.0005439344684952055 },
  11:
   { ChanceToWin: 0.00025650819135441334,
     ExpectedUnits: 0.00025650819135441334 },
  12:
   { ChanceToWin: 0.00012096393231695393,
     ExpectedUnits: 0.00012096393231695393 },
  13:
   { ChanceToWin: 0.00005704407662117671,
     ExpectedUnits: 0.00005704407662117671 },
  14:
   { ChanceToWin: 0.000026900801050650074,
     ExpectedUnits: 0.000026900801050650074 },
  15:
   { ChanceToWin: 0.000012685858725917416,
     ExpectedUnits: 0.000012685858725917416 } },
2:
{ 1:
   { ChanceToWin: 0.7207714772635861,
     ExpectedUnits: 1.192350695370582 },
  2:
   { ChanceToWin: 0.45741474041316704,
     ExpectedUnits: 0.6798016993635726 },
  3:
   { ChanceToWin: 0.27112439434247126,
     ExpectedUnits: 0.37599746256149613 },
  4:
   { ChanceToWin: 0.15399018668793743,
     ExpectedUnits: 0.2034461461991468 },
  5:
   { ChanceToWin: 0.084942614113803,
     ExpectedUnits: 0.10826501683083035 },
  6:
   { ChanceToWin: 0.045868933769767334,
     ExpectedUnits: 0.05686729420743957 },
  7:
   { ChanceToWin: 0.02437154220703047,
     ExpectedUnits: 0.02955814042268686 },
  8:
   { ChanceToWin: 0.012785572944750034,
     ExpectedUnits: 0.015231464875924416 },
  9:
   { ChanceToWin: 0.006638907828317401,
     ExpectedUnits: 0.007792339632794826 },
  10:
   { ChanceToWin: 0.003418197239903126,
     ExpectedUnits: 0.003962131708398331 },
  11:
   { ChanceToWin: 0.0017474950407664674,
     ExpectedUnits: 0.0020040032321208805 },
  12:
   { ChanceToWin: 0.0008880022006662806,
     ExpectedUnits: 0.0010089661329832345 },
  13:
   { ChanceToWin: 0.00044890665903802294,
     ExpectedUnits: 0.0005059507356591996 },
  14:
   { ChanceToWin: 0.00022590999359690722,
     ExpectedUnits: 0.0002528107946475573 },
  15:
   { ChanceToWin: 0.00011323792952991945,
     ExpectedUnits: 0.00012592378825583686 } },
3:
{ 1:
   { ChanceToWin: 0.8524498456887958,
     ExpectedUnits: 2.044800541059378 },
  2:
   { ChanceToWin: 0.6437050864838628,
     ExpectedUnits: 1.3235067858474354 },
  3:
   { ChanceToWin: 0.44682570582427206,
     ExpectedUnits: 0.8228231683857681 },
  4:
   { ChanceToWin: 0.2920853318362064,
     ExpectedUnits: 0.4955314780353532 },
  5:
   { ChanceToWin: 0.18262681497389216,
     ExpectedUnits: 0.2908918318047225 },
  6:
   { ChanceToWin: 0.11036110845797793,
     ExpectedUnits: 0.1672284026654175 },
  7:
   { ChanceToWin: 0.06492243462501202,
     ExpectedUnits: 0.09448057504769887 },
  8:
   { ChanceToWin: 0.03737223341048055,
     ExpectedUnits: 0.05260369828640497 },
  9:
   { ChanceToWin: 0.021132105476181624,
     ExpectedUnits: 0.028924445108976453 },
  10:
   { ChanceToWin: 0.011771708235586428,
     ExpectedUnits: 0.015733839943984758 },
  11:
   { ChanceToWin: 0.006474705661317495,
     ExpectedUnits: 0.008478708893438377 },
  12:
   { ChanceToWin: 0.003522575450435827,
     ExpectedUnits: 0.004531541583419061 },
  13:
   { ChanceToWin: 0.001898384984405272,
     ExpectedUnits: 0.0024043357200644717 },
  14:
   { ChanceToWin: 0.001014614442065821,
     ExpectedUnits: 0.0012674252367133783 },
  15:
   { ChanceToWin: 0.0005383083605316125,
     ExpectedUnits: 0.0006642321487874494 } },
4:
{ 1:
   { ChanceToWin: 0.92203143209044,
     ExpectedUnits: 2.9668319731498176 },
  2:
   { ChanceToWin: 0.7749580069235901,
     ExpectedUnits: 2.0984647927710256 },
  3:
   { ChanceToWin: 0.6015660798123378,
     ExpectedUnits: 1.424389248198106 },
  4:
   { ChanceToWin: 0.4380300209859587,
     ExpectedUnits: 0.9335614990213118 },
  5:
   { ChanceToWin: 0.3030696591670824,
     ExpectedUnits: 0.593961490971805 },
  6:
   { ChanceToWin: 0.20123845612390975,
     ExpectedUnits: 0.3684668587893273 },
  7:
   { ChanceToWin: 0.12920623745891868,
     ExpectedUnits: 0.22368681250661754 },
  8:
   { ChanceToWin: 0.08067924123527764,
     ExpectedUnits: 0.1332829395216826 },
  9:
   { ChanceToWin: 0.04921329719796724,
     ExpectedUnits: 0.0781377423069437 },
  10:
   { ChanceToWin: 0.0294283834831495,
     ExpectedUnits: 0.04516222342713427 },
  11:
   { ChanceToWin: 0.0172991831012169,
     ExpectedUnits: 0.025777891994655276 },
  12:
   { ChanceToWin: 0.010019337314558077,
     ExpectedUnits: 0.014550878897977139 },
  13:
   { ChanceToWin: 0.005728057334542897,
     ExpectedUnits: 0.008132393054607369 },
  14:
   { ChanceToWin: 0.0032373761558921565,
     ExpectedUnits: 0.004504801392605534 },
  15:
   { ChanceToWin: 0.0018111326410854974,
     ExpectedUnits: 0.002475364789872947 } },
5:
{ 1:
   { ChanceToWin: 0.9587997883821526,
     ExpectedUnits: 3.9256317615319705 },
  2:
   { ChanceToWin: 0.8616539704792162,
     ExpectedUnits: 2.9601187632502417 },
  3:
   { ChanceToWin: 0.724218123932122,
     ExpectedUnits: 2.1486073721302277 },
  4:
   { ChanceToWin: 0.572990382804835,
     ExpectedUnits: 1.5065518818261467 },
  5:
   { ChanceToWin: 0.4303586629710482,
     ExpectedUnits: 1.0243201539428533 },
  6:
   { ChanceToWin: 0.3092867841213967,
     ExpectedUnits: 0.6777536429107239 },
  7:
   { ChanceToWin: 0.21412848085029057,
     ExpectedUnits: 0.43781529335690816 },
  8:
   { ChanceToWin: 0.14361112930989825,
     ExpectedUnits: 0.27689406883158085 },
  9:
   { ChanceToWin: 0.09372935305630684,
     ExpectedUnits: 0.1718670953632505 },
  10:
   { ChanceToWin: 0.05975138443798073,
     ExpectedUnits: 0.104913607865115 },
  11:
   { ChanceToWin: 0.03731875901452853,
     ExpectedUnits: 0.06309665100918381 },
  12:
   { ChanceToWin: 0.022893177254603804,
     ExpectedUnits: 0.037444056152580944 },
  13:
   { ChanceToWin: 0.013822771165158199,
     ExpectedUnits: 0.021955164219765566 },
  14:
   { ChanceToWin: 0.008229228457715518,
     ExpectedUnits: 0.012734029850321052 },
  15:
   { ChanceToWin: 0.004837773248027648,
     ExpectedUnits: 0.007313138037900594 } },
6:
{ 1:
   { ChanceToWin: 0.9782289519627398,
     ExpectedUnits: 4.90386071349471 },
  2:
   { ChanceToWin: 0.9166283090980537,
     ExpectedUnits: 3.8767470723482953 },
  3:
   { ChanceToWin: 0.8149547686084945,
     ExpectedUnits: 2.9635621407387225 },
  4:
   { ChanceToWin: 0.6870957586718645,
     ExpectedUnits: 2.1936476404980114 },
  5:
   { ChanceToWin: 0.5514305418206995,
     ExpectedUnits: 1.5757506957635528 },
  6:
   { ChanceToWin: 0.4234767480467244,
     ExpectedUnits: 1.1012303909574486 },
  7:
   { ChanceToWin: 0.31285277300683834,
     ExpectedUnits: 0.7506680663637464 },
  8:
   { ChanceToWin: 0.2234219713156437,
     ExpectedUnits: 0.5003160401472245 },
  9:
   { ChanceToWin: 0.1548896965692933,
     ExpectedUnits: 0.3267567919325438 },
  10:
   { ChanceToWin: 0.10461663528488327,
     ExpectedUnits: 0.20953024314999824 },
  11:
   { ChanceToWin: 0.0690550388863637,
     ExpectedUnits: 0.13215168989554751 },
  12:
   { ChanceToWin: 0.04466215186927307,
     ExpectedUnits: 0.08210620802185402 },
  13:
   { ChanceToWin: 0.02836598220450981,
     ExpectedUnits: 0.050321146424275376 },
  14:
   { ChanceToWin: 0.017725303044842558,
     ExpectedUnits: 0.030459332895163612 },
  15:
   { ChanceToWin: 0.010915264472938493,
     ExpectedUnits: 0.01822840251083909 } },
7:
{ 1:
   { ChanceToWin: 0.9884957257735209,
     ExpectedUnits: 5.892356439268231 },
  2:
   { ChanceToWin: 0.9505194892612402,
     ExpectedUnits: 4.827266561609536 },
  3:
   { ChanceToWin: 0.8788842735768096,
     ExpectedUnits: 3.8424464143155315 },
  4:
   { ChanceToWin: 0.7775392365726403,
     ExpectedUnits: 2.9711868770706515 },
  5:
   { ChanceToWin: 0.6580587032990135,
     ExpectedUnits: 2.233809399062566 },
  6:
   { ChanceToWin: 0.5341007230866108,
     ExpectedUnits: 1.6353311140440592 },
  7:
   { ChanceToWin: 0.4171887083132306,
     ExpectedUnits: 1.1678567746769772 },
  8:
   { ChanceToWin: 0.3147983376441106,
     ExpectedUnits: 0.8151143777913351 },
  9:
   { ChanceToWin: 0.23029928849591078,
     ExpectedUnits: 0.5570560804284546 },
  10:
   { ChanceToWin: 0.1638859626157545,
     ExpectedUnits: 0.3734162057657527 },
  11:
   { ChanceToWin: 0.11377533175102865,
     ExpectedUnits: 0.24592702164657618 },
  12:
   { ChanceToWin: 0.07725449119880058,
     ExpectedUnits: 0.1593606992206546 },
  13:
   { ChanceToWin: 0.0514207870504592,
     ExpectedUnits: 0.10174193347473458 },
  14:
   { ChanceToWin: 0.0336153930459377,
     ExpectedUnits: 0.06407472594110131 },
  15:
   { ChanceToWin: 0.021620173356319664,
     ExpectedUnits: 0.03984857586715875 } },
8:
{ 1:
   { ChanceToWin: 0.9939209024181324,
     ExpectedUnits: 6.886277341686363 },
  2:
   { ChanceToWin: 0.9709866937425061,
     ExpectedUnits: 5.798253255352042 },
  3:
   { ChanceToWin: 0.9223178608643108,
     ExpectedUnits: 4.764764275179843 },
  4:
   { ChanceToWin: 0.8458138270147129,
     ExpectedUnits: 3.8170007040853644 },
  5:
   { ChanceToWin: 0.7466001177364452,
     ExpectedUnits: 2.9804095167990114 },
  6:
   { ChanceToWin: 0.6343110214637895,
     ExpectedUnits: 2.2696421355078487 },
  7:
   { ChanceToWin: 0.5195790789823495,
     ExpectedUnits: 1.6874358536593268 },
  8:
   { ChanceToWin: 0.4113686795277664,
     ExpectedUnits: 1.2264830573191017 },
  9:
   { ChanceToWin: 0.3156878503418315,
     ExpectedUnits: 0.8727439307702861 },
  10:
   { ChanceToWin: 0.23547257813679218,
     ExpectedUnits: 0.6088887839025449 },
  11:
   { ChanceToWin: 0.17116522404741327,
     ExpectedUnits: 0.41709224569398945 },
  12:
   { ChanceToWin: 0.12154084116736939,
     ExpectedUnits: 0.280901540388024 },
  13:
   { ChanceToWin: 0.08448794734451712,
     ExpectedUnits: 0.1862298808192517 },
  14:
   { ChanceToWin: 0.05760583242519729,
     ExpectedUnits: 0.12168055836629858 },
  15:
   { ChanceToWin: 0.03859026232305987,
     ExpectedUnits: 0.07843883819021862 } },
9:
{ 1:
   { ChanceToWin: 0.9967876785025857,
     ExpectedUnits: 7.883065020188949 },
  2:
   { ChanceToWin: 0.9831539019620549,
     ExpectedUnits: 6.781407157314097 },
  3:
   { ChanceToWin: 0.95100687355791,
     ExpectedUnits: 5.715771148737753 },
  4:
   { ChanceToWin: 0.8954206816538466,
     ExpectedUnits: 4.712421385739211 },
  5:
   { ChanceToWin: 0.816780802906856,
     ExpectedUnits: 3.797190319705867 },
  6:
   { ChanceToWin: 0.7203599783248638,
     ExpectedUnits: 2.9900021138327126 },
  7:
   { ChanceToWin: 0.6142631785051088,
     ExpectedUnits: 2.3016990321644357 },
  8:
   { ChanceToWin: 0.5070495087137005,
     ExpectedUnits: 1.733532566032802 },
  9:
   { ChanceToWin: 0.4059300315724967,
     ExpectedUnits: 1.2786739623427827 },
  10:
   { ChanceToWin: 0.3158567707485406,
     ExpectedUnits: 0.9247455546510857 },
  11:
   { ChanceToWin: 0.23939875050738763,
     ExpectedUnits: 0.6564909962013771 },
  12:
   { ChanceToWin: 0.1771201819015497,
     ExpectedUnits: 0.4580217222895737 },
  13:
   { ChanceToWin: 0.1281713840884194,
     ExpectedUnits: 0.3144012649076712 },
  14:
   { ChanceToWin: 0.09088308010399161,
     ExpectedUnits: 0.21256363847029022 },
  15:
   { ChanceToWin: 0.06325046844455821,
     ExpectedUnits: 0.14168930663477686 } },
10:
{ 1:
   { ChanceToWin: 0.9983025425626446,
     ExpectedUnits: 8.881367562751594 },
  2:
   { ChanceToWin: 0.990297686051865,
     ExpectedUnits: 7.771704843365961 },
  3:
   { ChanceToWin: 0.9695356041925978,
     ExpectedUnits: 6.68530675293035 },
  4:
   { ChanceToWin: 0.9303717388747312,
     ExpectedUnits: 5.642793124613942 },
  5:
   { ChanceToWin: 0.8703479276746295,
     ExpectedUnits: 4.667538247380497 },
  6:
   { ChanceToWin: 0.7910911782046957,
     ExpectedUnits: 3.7810932920374087 },
  7:
   { ChanceToWin: 0.6976515883428702,
     ExpectedUnits: 2.9993506205073057 },
  8:
   { ChanceToWin: 0.5969334883947701,
     ExpectedUnits: 2.330466054427572 },
  9:
   { ChanceToWin: 0.49600329239653523,
     ExpectedUnits: 1.774677254739318 },
  10:
   { ChanceToWin: 0.40081012657204096,
     ExpectedUnits: 1.3255556812231262 },
  11:
   { ChanceToWin: 0.3155170010255387,
     ExpectedUnits: 0.9720079972269157 },
  12:
   { ChanceToWin: 0.24238524565243164,
     ExpectedUnits: 0.7004069679420054 },
  13:
   { ChanceToWin: 0.1820322676220597,
     ExpectedUnits: 0.4964335325297308 },
  14:
   { ChanceToWin: 0.13386714268493513,
     ExpectedUnits: 0.34643078115522535 },
  15:
   { ChanceToWin: 0.09655182446826642,
     ExpectedUnits: 0.23824113110304324 } },
11:
{ 1:
   { ChanceToWin: 0.9991030282137225,
     ExpectedUnits: 9.880470590965317 },
  2:
   { ChanceToWin: 0.9944501024237183,
     ExpectedUnits: 8.76615494578968 },
  3:
   { ChanceToWin: 0.9812847637879577,
     ExpectedUnits: 7.666591516718308 },
  4:
   { ChanceToWin: 0.9543812633547728,
     ExpectedUnits: 6.597174387968714 },
  5:
   { ChanceToWin: 0.909976302409595,
     ExpectedUnits: 5.577514549790092 },
  6:
   { ChanceToWin: 0.8471549321217962,
     ExpectedUnits: 4.628248224159205 },
  7:
   { ChanceToWin: 0.7681542583065158,
     ExpectedUnits: 3.767504878813822 },
  8:
   { ChanceToWin: 0.6776776451934317,
     ExpectedUnits: 3.0081436996210034 },
  9:
   { ChanceToWin: 0.5816771416386448,
     ExpectedUnits: 2.356354396377963 },
  10:
   { ChanceToWin: 0.4861032521185952,
     ExpectedUnits: 1.8116589333417217 },
  11:
   { ChanceToWin: 0.39596193193561735,
     ExpectedUnits: 1.3679699291625327 },
  12:
   { ChanceToWin: 0.31480881928864174,
     ExpectedUnits: 1.015215787230647 },
  13:
   { ChanceToWin: 0.24464693004075286,
     ExpectedUnits: 0.7410804625704837 },
  14:
   { ChanceToWin: 0.18610858818749643,
     ExpectedUnits: 0.5325393693427218 },
  15:
   { ChanceToWin: 0.1387849330784063,
     ExpectedUnits: 0.3770260641814495 } },
12:
{ 1:
   { ChanceToWin: 0.9995260214673594,
     ExpectedUnits: 10.879996612432677 },
  2:
   { ChanceToWin: 0.996843800357493,
     ExpectedUnits: 9.762998746147172 },
  3:
   { ChanceToWin: 0.9886220820879174,
     ExpectedUnits: 8.655213598806226 },
  4:
   { ChanceToWin: 0.9705285218802924,
     ExpectedUnits: 7.5677029098490065 },
  5:
   { ChanceToWin: 0.9385314707222301,
     ExpectedUnits: 6.516046020512322 },
  6:
   { ChanceToWin: 0.8902462087483113,
     ExpectedUnits: 5.518494432907516 },
  7:
   { ChanceToWin: 0.82573028483301,
     ExpectedUnits: 4.593235163646831 },
  8:
   { ChanceToWin: 0.7474961932333509,
     ExpectedUnits: 3.7556398928543544 },
  9:
   { ChanceToWin: 0.659873960337105,
     ExpectedUnits: 3.016228356715067 },
  10:
   { ChanceToWin: 0.5680499068299079,
     ExpectedUnits: 2.3797088401716295 },
  11:
   { ChanceToWin: 0.477115044581386,
     ExpectedUnits: 1.8450849737439192 },
  12:
   { ChanceToWin: 0.3913490621062268,
     ExpectedUnits: 1.4065648493368739 },
  13:
   { ChanceToWin: 0.31382860677710217,
     ExpectedUnits: 1.0549090693475858 },
  14:
   { ChanceToWin: 0.24633869468742192,
     ExpectedUnits: 0.7788780640301436 },
  15:
   { ChanceToWin: 0.18950505188730696,
     ExpectedUnits: 0.5665311160687565 } },
13:
{ 1:
   { ChanceToWin: 0.9997495398931815,
     ExpectedUnits: 11.879746152325858 },
  2:
   { ChanceToWin: 0.9982140867357555,
     ExpectedUnits: 10.761212832882926 },
  3:
   { ChanceToWin: 0.9931454721398235,
     ExpectedUnits: 9.64835907094605 },
  4:
   { ChanceToWin: 0.9811942055996468,
     ExpectedUnits: 8.548897115448653 },
  5:
   { ChanceToWin: 0.9586503298780291,
     ExpectedUnits: 7.47469635039035 },
  6:
   { ChanceToWin: 0.9225041707059544,
     ExpectedUnits: 6.44099860361347 },
  7:
   { ChanceToWin: 0.8713668382661371,
     ExpectedUnits: 5.464602001912968 },
  8:
   { ChanceToWin: 0.8059110151642723,
     ExpectedUnits: 4.561550908018626 },
  9:
   { ChanceToWin: 0.7287420004674104,
     ExpectedUnits: 3.744970357182478 },
  10:
   { ChanceToWin: 0.6438289587032829,
     ExpectedUnits: 3.023537798874913 },
  11:
   { ChanceToWin: 0.5557338618510552,
     ExpectedUnits: 2.4008188355949738 },
  12:
   { ChanceToWin: 0.4688695174366412,
     ExpectedUnits: 1.8754343667735147 },
  13:
   { ChanceToWin: 0.38694267819835765,
     ExpectedUnits: 1.4418517475459431 },
  14:
   { ChanceToWin: 0.31264461128761656,
     ExpectedUnits: 1.0915226753177605 },
  15:
   { ChanceToWin: 0.24757510902660146,
     ExpectedUnits: 0.8141062250953579 } },
14:
{ 1:
   { ChanceToWin: 0.999867651674522,
     ExpectedUnits: 12.87961380400038 },
  2:
   { ChanceToWin: 0.9989938735966682,
     ExpectedUnits: 11.760206706479597 },
  3:
   { ChanceToWin: 0.9959034567260181,
     ExpectedUnits: 10.644262527672067 },
  4:
   { ChanceToWin: 0.9881307827447605,
     ExpectedUnits: 9.537027898193415 },
  5:
   { ChanceToWin: 0.9725526987903628,
     ExpectedUnits: 8.447249049180714 },
  6:
   { ChanceToWin: 0.9461060164474002,
     ExpectedUnits: 7.38710462006087 },
  7:
   { ChanceToWin: 0.9066122814747994,
     ExpectedUnits: 6.371214283387768 },
  8:
   { ChanceToWin: 0.8533996395934141,
     ExpectedUnits: 5.414950547612041 },
  9:
   { ChanceToWin: 0.7875279524577828,
     ExpectedUnits: 4.5324983096402605 },
  10:
   { ChanceToWin: 0.7115944178206999,
     ExpectedUnits: 3.7351322166956122 },
  11:
   { ChanceToWin: 0.629234460968906,
     ExpectedUnits: 3.0300532965638802 },
  12:
   { ChanceToWin: 0.544494292119795,
     ExpectedUnits: 2.4199286588933098 },
  13:
   { ChanceToWin: 0.46124074510025087,
     ExpectedUnits: 1.9030924926461945 },
  14:
   { ChanceToWin: 0.3827194598837208,
     ExpectedUnits: 1.4742421352014807 },
  15:
   { ChanceToWin: 0.311306376357666,
     ExpectedUnits: 1.125412601453024 } } }

// console.log(
//   'The chance to win a fight with 2 attackers against 1 defender is ',
//   (battleMatrix[2][1].ChanceToWin * 100).toFixed(2),
//   '%'
// );

module.exports = battleMatrix

