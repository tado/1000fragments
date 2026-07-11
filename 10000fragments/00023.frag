uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.79 + t * 2.80 + ph) + sin(p.y * 17.27 - t * 0.78 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.51 + t * 1.91 + ph) + sin(p.y * 3.91 - t * 0.59 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.98) - 0.5;
	p *= 3.29;
	{ p = vec2(atan(p.y, p.x) * 2.03, length(p) * 3.09 - time * 0.36); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.27, lr * 1.67 + time * 0.22); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.35);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.09 + time * 0.28, vec3(0.44, 0.58, 0.41), vec3(0.34, 0.38, 0.34), vec3(1.19, 0.95, 1.21), vec3(0.96, 0.11, 0.32));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
