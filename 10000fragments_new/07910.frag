uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.34 + t * 1.89 + ph) + sin(p.y * 3.73 - t * 1.89 + ph)
        + sin((p.x + p.y) * 7.51 + t * 1.89 + ph) + sin(length(p) * 6.95 - t * 1.89 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.88 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.18 + t * 3.10 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.75;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.50; q1 = rot2(0.67) * q1; }
	{ float fr = length(q1); q1 *= 1.0 + 0.78 * fr * fr; }
	q2 = abs(q2) - 0.67;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.07);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.49 + time * 0.26, vec3(0.44, 0.45, 0.51), vec3(0.41, 0.37, 0.30), vec3(0.97, 0.72, 1.10), vec3(0.73, 0.72, 0.94));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.31 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
