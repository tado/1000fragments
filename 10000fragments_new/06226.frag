uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.35 + 0.21 * pow(abs(cos(ra * 5.0 + t * 2.97)), 2.95);
    v = sin((rr - pet) * 20.62 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.66) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 3.95 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 7.39 + time * 2.11) * 0.34;
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.59; q2 = rot2(2.28) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.31);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.14 + time * 0.19, vec3(0.58, 0.59, 0.58), vec3(0.36, 0.47, 0.39), vec3(1.06, 1.27, 0.99), vec3(0.02, 0.74, 0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
