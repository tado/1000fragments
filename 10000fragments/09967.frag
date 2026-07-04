uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.95 + t * 0.75 + ph) + sin(p.y * 13.96 - t * 0.75 + ph)
        + sin((p.x + p.y) * 2.71 + t * 0.75 + ph) + sin(length(p) * 17.27 - t * 0.75 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.53 + vec2(t * 0.94, -t * 0.47);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.49;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -1.77 + time * 1.49) * q1;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.58; }
	q2 = sin(q2 * 1.48 + time * 1.05) * 1.14;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.02);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.82 + time * 0.34, vec3(0.51, 0.59, 0.59), vec3(0.43, 0.45, 0.46), vec3(1.00, 0.76, 1.03), vec3(0.99, 0.57, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
