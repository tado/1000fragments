uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.98 - t * 2.40 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.06) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 1.57 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.09, lr * 1.01 + time * -0.85); }
	q2.x += sin(q2.y * 7.60 + time * 3.07) * 0.11;
	q2 = rot2(q2.y * -3.68 + time * 0.41) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.91);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.65 + time * 0.16, vec3(0.60, 0.42, 0.48), vec3(0.45, 0.47, 0.31), vec3(0.80, 1.39, 1.24), vec3(0.62, 0.38, 0.60));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
