uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.82 + t * 5.30 + ph) + sin(p.y * 16.42 - t * 3.79 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.26;
	p *= 2.61;
	{ p = vec2(atan(p.y, p.x) * 2.28, length(p) * 4.30 - time * 0.45); }
	p = abs(p) - 0.32;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.95, lr * 2.61 + time * -0.19); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.11 + time * 0.15);
	col = mod(col * 1.98, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
