insert into public.appointments (source, category, title, location, lat, lng, date, slots_available, total_slots, price, link, is_active)
select * from (
  values
  ('Goethe-Institut','language-exam','Goethe-Zertifikat B1','Berlin',52.52,13.405,'2026-04-15T10:00:00Z'::timestamptz,8,20,150,'https://goethe.de',true),
  ('Telc','language-exam','Telc B1 Deutschtest','München',48.1351,11.582,'2026-04-20T10:00:00Z'::timestamptz,12,25,140,'https://telc.net',true),
  ('BAMF','citizenship','Einbürgerungstest','Hamburg',53.5511,9.9937,'2026-04-10T10:00:00Z'::timestamptz,5,25,25,'https://bamf.de',true),
  ('Bürgeramt','buergeramt','Meldebescheinigung','Frankfurt',50.1109,8.6821,'2026-03-25T10:00:00Z'::timestamptz,3,10,null,'https://frankfurt.de',true),
  ('KFZ-Stelle','kfz','KFZ-Zulassung','Köln',50.9375,6.9603,'2026-03-28T10:00:00Z'::timestamptz,6,15,null,'https://koeln.de',true)
) as v(source, category, title, location, lat, lng, date, slots_available, total_slots, price, link, is_active)
where not exists (select 1 from public.appointments);
