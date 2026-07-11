uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.71 + t * 2.37 + ph) * 0.7;
    float wb = sin(p.y * 7.34 - t * 3.20 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.80;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 33.24 - t * 6.37 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 36.71 - t * 1.92 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(3.05) * q1;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.22 / wf * sin(wf * 3.29 * q2.y + time * 1.21); q2.y += 0.27 / wf * cos(wf * 2.27 * q2.x + time * 1.51); }
	q2 = rot2(time * 0.43) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.98);
	float d = d1 * d2;
	vec3 col = palette(d * 0.65 + time * 0.36, vec3(0.46, 0.43, 0.43), vec3(0.34, 0.45, 0.39), vec3(1.38, 1.21, 1.36), vec3(0.98, 0.58, 0.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
