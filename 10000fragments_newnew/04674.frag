uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.04 - t * 0.54;
    v = sin(floor(lv * 5.9) / 5.9 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.18 + sin(p.y * 2.40 + t * 4.42) * 2.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.26, lr * 2.61 + time * -0.91); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.63);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.66 + time * 0.37, vec3(0.49, 0.50, 0.51), vec3(0.36, 0.44, 0.44), vec3(1.14, 1.07, 1.12), vec3(0.18, 0.75, 0.95));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
