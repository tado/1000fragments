uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
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

float fieldA(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 1.14 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.50); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.11 + t * 5.64 + ph) + sin(p.y * 12.61 - t * 4.57 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.64;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.93, 0.26) * sin(length(q1) * 3.87 - time * 2.43) * 0.22;
	q1 = rot2(q1.y * -2.72 + time * 1.17) * q1;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.47 / wf * sin(wf * 3.81 * q2.y + time * 1.23); q2.y += 0.38 / wf * cos(wf * 2.64 * q2.x + time * 1.26); }
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.51);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.47 + time * 0.17, vec3(0.41, 0.42, 0.42), vec3(0.39, 0.48, 0.35), vec3(1.02, 0.92, 1.14), vec3(0.14, 0.70, 0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
