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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.32 * vnoise2(p * 4.21 + t * 1.12);
    v = sin(wr * 19.92 - t * 3.18 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.02 + vec2(t * 0.55, -t * 1.00);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.25;
	vec2 q1 = p; vec2 q2 = p;
	q2 *= 1.0 + 0.10 * sin(time * 3.01);
	q2 *= 1.26;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.58);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 1.45 + time * 0.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
