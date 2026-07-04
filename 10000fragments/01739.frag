uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.96, t * 1.89 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.10;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 10.70 - t * 1.29 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.37 + 0.16 * cos(sa * 4.0 + t * 2.60 + ph);
    v = sin((sr - petal) * 9.23);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.28;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.43 / wf * sin(wf * 1.66 * q2.y + time * 2.17); q2.y += 0.27 / wf * cos(wf * 2.90 * q2.x + time * 1.34); }
	q2 *= 2.72;
	for(int fo = 0; fo < 5; fo++){ q3 = abs(q3) - 0.60; q3 = rot2(2.21) * q3; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.83);
	float d3 = fieldC(q3, time, 1.98);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 0.83 + time * 0.22);
	col *= 0.87 + 0.13 * sin(gl_FragCoord.y * 1.88 + time * 11.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
