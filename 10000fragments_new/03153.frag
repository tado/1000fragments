uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.26;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.77; kp = rot2(1.76) * kp; kp *= 1.28; }
    v = sin(kp.y * 3.07 - t * 4.53 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.77 + vec2(t * 0.54, -t * 0.54) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.35;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.64, lr * 2.93 + time * 0.40); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.26);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.32, 0.40), vec3(0.79, 0.57, 0.66), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
