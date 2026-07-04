uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.79 - t * 1.10;
    v = sin(floor(lv * 5.9) / 5.9 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.37;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.42; kp = rot2(1.20) * kp; kp *= 1.31; }
    v = sin(kp.y * 3.05 - t * 4.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.18;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(length(q2) * 3.99 + time * 0.76) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.85);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.22, 0.64, 1.00) * (0.13 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = fract(col * 1.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
