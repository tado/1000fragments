uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 6.62;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.33 + 0.06 * sin(t * 4.25 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.66 + t * 3.17 + ph) + sin(p.y * 6.25 - t * 4.81 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.25 - t * 1.95;
    v = sin(floor(lv * 2.0) / 2.0 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.80;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = sin(q1 * 1.64 + time * 0.87) * 1.33;
	q1 *= 1.0 + 0.37 * sin(time * 4.10);
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.16; q2 = rot2(2.26) * q2; }
	q3 = rot2(time * 1.33) * q3;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.80);
	float d3 = fieldC(q3, time, 0.22);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.43 + time * 0.25, vec3(0.44, 0.47, 0.57), vec3(0.45, 0.34, 0.40), vec3(0.92, 0.88, 1.02), vec3(0.33, 0.68, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
