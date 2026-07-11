uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.83 + sin(p.y * 5.95 + t * 2.27) * 1.92 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.04 + sin(p.y * 2.27 + t * 4.06) * 1.37 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p) - 0.63;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.13, lr * 1.97 + time * -0.33); }
	{ float fr = length(p); p *= 1.0 + -0.33 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.42);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.69 + time * 0.01, vec3(0.55, 0.48, 0.51), vec3(0.40, 0.31, 0.36), vec3(1.09, 0.95, 0.94), vec3(0.28, 0.34, 0.98));
	col = fract(col * 2.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
