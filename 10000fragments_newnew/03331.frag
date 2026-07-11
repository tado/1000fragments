uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.10 + t * 4.45 + ph) + sin(p.y * 2.25 - t * 4.45 + ph)
        + sin((p.x + p.y) * 11.00 + t * 4.45 + ph) + sin(length(p) * 6.46 - t * 4.45 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.97;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.72; kp = rot2(1.08) * kp; kp *= 1.22; }
    v = sin(kp.y * 2.66 - t * 2.48 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.58;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.16) - 0.5;
	q2 = rot2(length(q2) * 1.71 + time * 0.91) * q2;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.95;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.01);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.33 + time * 0.24, vec3(0.57, 0.45, 0.46), vec3(0.37, 0.40, 0.42), vec3(1.05, 1.07, 1.35), vec3(0.95, 0.26, 0.70));
	col = clamp((col - 0.5) * 1.61 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
