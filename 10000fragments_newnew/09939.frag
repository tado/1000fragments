uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.49 - t * 6.74 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.33 - t * 8.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.51;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.82, lr * 1.36 + time * -0.26); }
	q2 += vec2(-0.23, 0.01) * sin(length(q2) * 5.16 - time * 1.97) * 0.26;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.23);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.85 + time * 0.27, vec3(0.57, 0.42, 0.44), vec3(0.39, 0.39, 0.43), vec3(0.78, 1.03, 1.20), vec3(0.39, 0.91, 0.88));
	col = mod(col * 2.55, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
