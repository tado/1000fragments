uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.81, t * 1.58 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.93 - t * 4.59 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.58;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.34 / wf * sin(wf * 3.62 * q1.y + time * 0.86); q1.y += 0.33 / wf * cos(wf * 2.58 * q1.x + time * 1.93); }
	q1 = abs(q1);
	q2.y += sin(q2.x * 4.07 + time * 2.10) * 0.36;
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.57; q2 = rot2(1.29) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.95);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.70 + time * 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
