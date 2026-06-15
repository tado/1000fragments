uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.07 + t * 0.52 + ph) + sin(p.y * 4.83 - t * 3.74 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.17, lr * 2.15 + time * 0.20); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.34) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.28 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.90 + time * 0.09, vec3(0.58, 0.50, 0.57), vec3(0.44, 0.38, 0.32), vec3(0.71, 1.30, 0.98), vec3(0.21, 0.40, 0.95));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
