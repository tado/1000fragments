uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.95 + t * 0.75 + ph) + sin(p.y * 2.84 - t * 0.75 + ph)
        + sin((p.x + p.y) * 8.73 + t * 0.75 + ph) + sin(length(p) * 9.75 - t * 0.75 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.34, lr * 1.61 + time * 0.40); }
	{ float fr = length(p); p *= 1.0 + 0.33 * fr * fr; }
	p *= 2.97;
	p = abs(p) - 0.44;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.64 + time * 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
