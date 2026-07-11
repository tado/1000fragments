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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 14.90 + t * 2.69 + ph) * 0.7;
    float wb = sin(p.y * 5.88 - t * 2.61 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.47;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 5.42 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.25); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 5.77 + time * 2.45) * 0.28;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.28; q2 = rot2(0.44) * q2; }
	q2 = rot2(q2.y * -3.44 + time * 0.39) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.73);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.13));
	vec3 col = hue(d * 1.14 + time * 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
