uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.15 + ga * 4.0 - t * 2.28 + ph);
    v = arm * exp(-gr * 1.24);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.27;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.63; kp = rot2(1.57) * kp; kp *= 1.42; }
    v = sin(kp.y * 1.75 - t * 1.40 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 2.74 + time * 1.33) * q1;
	q2 *= 1.59;
	q2 = abs(q2) - 0.50;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.23);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.26 + time * 0.07, vec3(0.43, 0.52, 0.55), vec3(0.30, 0.32, 0.37), vec3(1.39, 1.16, 1.17), vec3(0.34, 0.83, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
