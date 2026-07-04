uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.05, t * 2.13 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.22 + vec2(t * 0.38, -t * 0.39);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.12;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 0.47) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.61);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.68));
	vec3 col = palette(d * 0.78 + time * 0.18, vec3(0.54, 0.40, 0.59), vec3(0.41, 0.44, 0.41), vec3(0.79, 0.90, 1.11), vec3(0.60, 0.15, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
