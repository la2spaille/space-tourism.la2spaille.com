BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "crew" (
	"id"	INTEGER,
	"job"	TEXT,
	"name"	TEXT,
	"description"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "destination" (
	"id"	INTEGER,
	"nom"	TEXT,
	"description"	TEXT,
	"distance"	TEXT,
	"travel"	TEXT
);
CREATE TABLE IF NOT EXISTS "technology" (
	"id"	INTEGER,
	"name"	TEXT,
	"description"	TEXT
);
INSERT INTO "crew" VALUES (1,'Commander','Douglas Hurley','Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.');
INSERT INTO "crew" VALUES (2,'Mission Specialist','MARK SHUTTLEWORTH','Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.');
INSERT INTO "crew" VALUES (3,'Pilot','Victor Glover','Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer.');
INSERT INTO "crew" VALUES (4,'Flight Engineer','Anousheh Ansari','Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.');
INSERT INTO "destination" VALUES (1,'MOON','See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.','384,400 km','3 days');
INSERT INTO "destination" VALUES (2,'MARS','Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!','225 MIL. km','9 months');
INSERT INTO "destination" VALUES (3,'EUROPA','The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.','628 MIL. km','3 years');
INSERT INTO "destination" VALUES (4,'TITAN','The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.','1.6 BIL. km','7 years');
INSERT INTO "technology" VALUES (1,'LAUNCH VEHICLE','A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth''s surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it''s quite an awe-inspiring sight on the launch pad!');
INSERT INTO "technology" VALUES (2,'SPACEPORT','A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.');
INSERT INTO "technology" VALUES (3,'SPACE CAPSULE','A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth''s atmosphere without wings. Our capsule is where you''ll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.');
COMMIT;
