uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.89 + t * 3.71 + ph) * 0.7;
    float wb = sin(p.y * 14.42 - t * 3.75 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.66;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.36;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.59; kp = rot2(2.12) * kp; kp *= 1.36; }
    v = sin(kp.y * 3.78 - t * 1.88 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.89;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q2); q2 *= 1.0 + -0.65 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.14);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.14 + time * 0.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
