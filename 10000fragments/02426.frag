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
    float wr = length(p) + 0.25 * vnoise2(p * 3.77 + t * 1.26);
    v = sin(wr * 14.56 - t * 2.16 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.59 + t * 3.49 + ph) * 0.7;
    float wb = sin(p.y * 14.28 - t * 1.05 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.29;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.18; q2 = rot2(2.05) * q2; }
	q2 = rot2(length(q2) * 2.52 + time * 1.35) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.01);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.05 + time * 0.07);
	col = fract(col * 1.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
