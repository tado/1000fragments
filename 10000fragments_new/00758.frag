uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.17 + t * 2.16 + ph) + sin(p.y * 16.81 - t * 3.08 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.36 - t * 3.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.81;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(1.76) * q1;
	q1 = rot2(length(q1) * -2.54 + time * 0.50) * q1;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.40, length(q2) * 4.70 - time * 0.97); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.35 / wf * sin(wf * 2.28 * q2.y + time * 2.16); q2.y += 0.21 / wf * cos(wf * 1.99 * q2.x + time * 1.90); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.37);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.71 + time * 0.07, vec3(0.48, 0.44, 0.47), vec3(0.33, 0.44, 0.48), vec3(1.30, 0.78, 0.93), vec3(0.88, 0.41, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
