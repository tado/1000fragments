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

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.61 - t * 5.65 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.74 + vec2(t * 2.04, -t * 1.38) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 1.29 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.24); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * -2.76 + time * 0.44) * q1;
	q1 = fract(q1 * 1.02) - 0.5;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(q3); q3 *= 1.0 + 0.24 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.33);
	float d3 = fieldC(q3, time, 1.65);
	d2 = min(d2, d3);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.30, 0.24), vec3(0.56, 0.62, 0.51), cc);
	col = clamp((col - 0.5) * 1.24 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
