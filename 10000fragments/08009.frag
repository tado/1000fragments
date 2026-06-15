uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.27 - t * 1.17 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.38 - t * 6.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.13;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.85, lr * 1.75 + time * 0.18); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.20);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.27 + time * 0.27, vec3(0.46, 0.45, 0.41), vec3(0.45, 0.39, 0.40), vec3(0.80, 0.88, 0.84), vec3(0.35, 0.40, 0.98));
	col = fract(col * 1.56);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
