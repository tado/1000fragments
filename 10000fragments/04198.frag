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

float fieldA(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 1.95 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.76); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.62, t * 1.61 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.60;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.26;
	q1 = (floor(q1 * 28.7) + 0.5) / 28.7;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.34);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.44));
	vec3 col = vec3(0.30, 0.22, 0.53) * (0.14 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = fract(col * 1.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
