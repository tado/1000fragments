uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.70) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 3.80 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.34;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.44; kp = rot2(0.53) * kp; kp *= 1.29; }
    v = sin(kp.y * 2.31 - t * 2.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.86;
	vec2 q1 = p; vec2 q2 = p;
	q2 += vec2(0.03, -0.16) * sin(length(q2) * 2.32 - time * 1.18) * 0.33;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.20);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.35 + time * 0.05, vec3(0.54, 0.50, 0.45), vec3(0.31, 0.31, 0.39), vec3(0.92, 1.03, 1.22), vec3(0.66, 0.05, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
