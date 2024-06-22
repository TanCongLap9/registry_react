const REGISTRY_DATA_SAMPLE = String.raw`Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE]

[HKEY_LOCAL_MACHINE\BCD00000000]

[HKEY_LOCAL_MACHINE\BCD00000000\Description]
"KeyName"="BCD00000000"
"System"=dword:00000001
"TreatAsSystem"=dword:00000001
"GuidCache"=hex:0d,50,42,4b,1f,e8,d4,01,0c,27,00,00,c5,01,f9,81,ca,0c,e4,ab,00,\
00,00,00

[HKEY_LOCAL_MACHINE\BCD00000000\Objects]

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{0ce4991b-e6b3-4b16-b23c-5e0d9250e5d9}]

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{0ce4991b-e6b3-4b16-b23c-5e0d9250e5d9}\Description]
"Type"=dword:20100000

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{0ce4991b-e6b3-4b16-b23c-5e0d9250e5d9}\Elements]

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{0ce4991b-e6b3-4b16-b23c-5e0d9250e5d9}\Elements\16000020]
"Element"=hex:01

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{1afa9c49-16ab-4a5c-901b-212802da9460}]

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{1afa9c49-16ab-4a5c-901b-212802da9460}\Description]
"Type"=dword:20200004

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{1afa9c49-16ab-4a5c-901b-212802da9460}\Elements]

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{1afa9c49-16ab-4a5c-901b-212802da9460}\Elements\14000006]
"Element"=hex(7):7b,00,37,00,65,00,61,00,32,00,65,00,31,00,61,00,63,00,2d,00,\
   32,00,65,00,36,00,31,00,2d,00,34,00,37,00,32,00,38,00,2d,00,61,00,61,00,61,\
   00,33,00,2d,00,38,00,39,00,36,00,64,00,39,00,64,00,30,00,61,00,39,00,66,00,\
   30,00,65,00,7d,00,00,00,00,00

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{4636856e-540f-4170-a130-a84776f4c654}]

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{4636856e-540f-4170-a130-a84776f4c654}\Description]
"Type"=dword:20100000

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{4636856e-540f-4170-a130-a84776f4c654}\Elements]

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{4636856e-540f-4170-a130-a84776f4c654}\Elements\15000011]
"Element"=hex:00,00,00,00,00,00,00,00

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{4636856e-540f-4170-a130-a84776f4c654}\Elements\15000013]
"Element"=hex:01,00,00,00,00,00,00,00

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{4636856e-540f-4170-a130-a84776f4c654}\Elements\15000014]
"Element"=hex:00,c2,01,00,00,00,00,00

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{5189b25c-5558-4bf2-bca4-289b11bd29e2}]

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{5189b25c-5558-4bf2-bca4-289b11bd29e2}\Description]
"Type"=dword:20100000

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{5189b25c-5558-4bf2-bca4-289b11bd29e2}\Elements]

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{6efb52bf-1766-41db-a6b3-0ee5eff72bd7}]

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{6efb52bf-1766-41db-a6b3-0ee5eff72bd7}\Description]
"Type"=dword:20200003

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{6efb52bf-1766-41db-a6b3-0ee5eff72bd7}\Elements]

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{6efb52bf-1766-41db-a6b3-0ee5eff72bd7}\Elements\14000006]
"Element"=hex(7):7b,00,37,00,65,00,61,00,32,00,65,00,31,00,61,00,63,00,2d,00,\
32,00,65,00,36,00,31,00,2d,00,34,00,37,00,32,00,38,00,2d,00,61,00,61,00,61,\
00,33,00,2d,00,38,00,39,00,36,00,64,00,39,00,64,00,30,00,61,00,39,00,66,00,\
30,00,65,00,7d,00,00,00,7b,00,37,00,66,00,66,00,36,00,30,00,37,00,65,00,30,\
00,2d,00,34,00,33,00,39,00,35,00,2d,00,31,00,31,00,64,00,62,00,2d,00,62,00,\
30,00,64,00,65,00,2d,00,30,00,38,00,30,00,30,00,32,00,30,00,30,00,63,00,39,\
00,61,00,36,00,36,00,7d,00,00,00,00,00

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{7ea2e1ac-2e61-4728-aaa3-896d9d0a9f0e}]

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{7ea2e1ac-2e61-4728-aaa3-896d9d0a9f0e}\Description]
"Type"=dword:20100000

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{7ea2e1ac-2e61-4728-aaa3-896d9d0a9f0e}\Elements]

[HKEY_LOCAL_MACHINE\BCD00000000\Objects\{7ea2e1ac-2e61-4728-aaa3-896d9d0a9f0e}\Elements\14000006]
"Element"=hex(7):7b,00,34,00,36,00,33,00,36,00,38,00,35,00,36,00,65,00,2d,00,\
   35,00,34,00,30,00,66,00,2d,00,34,00,31,00,37,00,30,00,2d,00,61,00,31,00,33,\
   00,30,00,2d,00,61,00,38,00,34,00,37,00,37,00,36,00,66,00,34,00,63,00,36,00,\
   35,00,34,00,7d,00,00,00,7b,00,30,00,63,00,65,00,34,00,39,00,39,00,31,00,62,\
   00,2d,00,65,00,36,00,62,00,33,00,2d,00,34,00,62,00,31,00,36,00,2d,00,62,00,\
   32,00,33,00,63,00,2d,00,35,00,65,00,30,00,64,00,39,00,32,00,35,00,30,00,65,\
   00,35,00,64,00,39,00,7d,00,00,00,7b,00,35,00,31,00,38,00,39,00,62,00,32,00,\
   35,00,63,00,2d,00,35,00,35,00,35,00,38,00,2d,00,34,00,62,00,66,00,32,00,2d,\
00,62,00,63,00,61,00,34,00,2d,00,32,00,38,00,39,00,62,00,31,00,31,00,62,00,\
64,00,32,00,39,00,65,00,32,00,7d,00,00,00,00,00
`;
export default REGISTRY_DATA_SAMPLE;
