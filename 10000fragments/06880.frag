uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.40 + t * 0.63 + ph) + sin(p.y * 4.39 - t * 0.63 + ph)
        + sin((p.x + p.y) * 9.95 + t * 0.63 + ph) + sin(length(p) * 17.42 - t * 0.63 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.84, t * 0.85 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.75;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.07, lr * 2.32 + time * 0.38); }
	p += vec2(-0.59, 0.24) * sin(length(p) * 4.09 - time * 0.68) * 0.18;
	{ p = vec2(atan(p.y, p.x) * 1.71, length(p) * 2.00 - time * 0.75); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.45);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.16 + time * 0.22, vec3(0.49, 0.55, 0.58), vec3(0.42, 0.34, 0.38), vec3(1.06, 1.32, 1.16), vec3(0.81, 0.31, 0.94));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
