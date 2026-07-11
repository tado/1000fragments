uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.57 - t * 1.03 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.88;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.60, lr * 1.43 + time * 0.26); }
	{ p = vec2(atan(p.y, p.x) * 2.69, length(p) * 2.79 - time * 0.48); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.95 + time * 0.07, vec3(0.44, 0.41, 0.54), vec3(0.35, 0.50, 0.49), vec3(1.23, 0.70, 1.32), vec3(0.62, 0.60, 0.84));
	col = fract(col * 1.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
