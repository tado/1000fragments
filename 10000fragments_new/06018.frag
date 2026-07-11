uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.86;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.69; kp = rot2(0.73) * kp; kp *= 1.32; }
    v = sin(kp.y * 3.62 - t * 3.52 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.33 + sin(p.y * 4.90 + t * 5.42) * 4.46 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(0.54) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.72);
	float d = d1 * d2;
	vec3 col = palette(d * 1.10 + time * 0.05, vec3(0.56, 0.46, 0.47), vec3(0.39, 0.43, 0.45), vec3(1.09, 0.95, 0.91), vec3(0.12, 0.87, 0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
