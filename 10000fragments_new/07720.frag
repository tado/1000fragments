uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.52, t * 0.67 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.63, t * 1.46 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.29; q2 = rot2(1.76) * q2; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.49 / wf * sin(wf * 2.34 * q2.y + time * 1.21); q2.y += 0.29 / wf * cos(wf * 2.14 * q2.x + time * 1.94); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.07);
	float d = d1 * d2;
	vec3 col = vec3(0.41, 0.71, 0.17) * (0.18 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
