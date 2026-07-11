uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.52 + 0.26 * pow(abs(cos(ra * 3.0 + t * 2.07)), 2.20);
    v = sin((rr - pet) * 17.57 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 4.93 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.95); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 2.10 * p.y + time * 1.92); p.y += 0.41 / wf * cos(wf * 3.94 * p.x + time * 0.90); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.71);
	float d = d1 * d2;
	vec3 col = palette(d * 1.21 + time * 0.18, vec3(0.53, 0.45, 0.48), vec3(0.41, 0.31, 0.50), vec3(0.72, 1.04, 0.73), vec3(0.55, 0.75, 0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
