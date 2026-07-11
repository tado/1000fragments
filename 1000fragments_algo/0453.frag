uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.13 + sr * 13.47 - t * 2.31 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.81;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.47; kp = rot2(2.45) * kp; kp *= 1.17; }
    v = sin(kp.y * 2.18 - t * 1.06 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.94;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.60) - 0.5;
	q2 = (floor(q2 * 27.2) + 0.5) / 27.2;
	q2 = abs(q2);
	float d1 = fieldA(q1, (time * 0.78), 0.0);
	float d2 = fieldB(q2, (time * 0.78), 1.39);
	float d = d1 * d2;
	vec3 col = vec3(0.78, 0.66, 0.67) * (0.06 / (abs((d)) + 0.05));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(0.992, 1.001, 1.008) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
