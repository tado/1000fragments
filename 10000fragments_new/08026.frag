uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.99;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.69; kp = rot2(2.80) * kp; kp *= 1.40; }
    v = sin(kp.y * 1.60 - t * 1.56 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.35 + t * 4.40 + ph) + sin(p.y * 16.77 - t * 0.96 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.01, lr * 2.34 + time * 0.49); }
	q1 = rot2(0.71) * q1;
	q2 = rot2(q2.y * -2.32 + time * 0.32) * q2;
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.19; q2 = rot2(2.53) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.52);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.28 + time * 0.25);
	col = fract(col * 1.88);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
