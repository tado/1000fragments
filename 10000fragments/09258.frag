uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.18;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.63; kp = rot2(1.44) * kp; kp *= 1.25; }
    v = sin(kp.x * 2.42 - t * 2.35 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.93 + t * 2.58 + ph) + sin(p.y * 13.48 - t * 1.57 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.97;
	vec2 q1 = p; vec2 q2 = p;
	q2 *= 1.0 + 0.29 * sin(time * 3.22);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.82);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.41 + time * 0.30, vec3(0.51, 0.59, 0.51), vec3(0.37, 0.35, 0.32), vec3(0.98, 1.20, 1.38), vec3(0.83, 0.49, 0.59));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
