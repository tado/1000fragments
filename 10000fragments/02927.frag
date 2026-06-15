uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.77 + vec2(t * 1.99, -t * 1.99) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.22 + t * 3.60 + ph) + sin(p.y * 12.77 - t * 3.60 + ph)
        + sin((p.x + p.y) * 3.36 + t * 3.60 + ph) + sin(length(p) * 17.86 - t * 3.60 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.23;
	{ float fr = length(p); p *= 1.0 + 0.70 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.11, lr * 1.24 + time * 0.70); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.84);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.84 + time * 0.04, vec3(0.54, 0.50, 0.48), vec3(0.37, 0.49, 0.50), vec3(1.32, 0.90, 0.92), vec3(0.54, 0.72, 0.23));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
