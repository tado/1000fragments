uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.92 + t * 0.69 + ph) + sin(p.y * 12.08 - t * 0.69 + ph)
        + sin((p.x + p.y) * 11.80 + t * 0.69 + ph) + sin(length(p) * 14.66 - t * 0.69 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.62;
	p = fract(p * 2.52) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.62, lr * 1.43 + time * -0.46); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.11 + time * 0.11);
	col = clamp((col - 0.5) * 1.92 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
