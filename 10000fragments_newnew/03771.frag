uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.83 + t * 3.21 + ph) + sin(p.y * 6.59 - t * 3.21 + ph)
        + sin((p.x + p.y) * 8.75 + t * 3.21 + ph) + sin(length(p) * 16.87 - t * 3.21 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.21;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.52; kp = rot2(0.32) * kp; kp *= 1.29; }
    v = sin(kp.x * 2.89 - t * 4.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -3.27 + time * 0.90) * q1;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.12, length(q2) * 5.38 - time * 0.22); }
	q2 = sin(q2 * 1.93 + time * 1.33) * 1.13;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.18);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.49 + time * 0.98);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
