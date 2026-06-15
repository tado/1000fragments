uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.04 + t * 1.31 + ph) + sin(p.y * 6.65 - t * 1.31 + ph)
        + sin((p.x + p.y) * 9.09 + t * 1.31 + ph) + sin(length(p) * 7.50 - t * 1.31 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	p *= 2.93;
	p = abs(p) - 0.35;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.79, lr * 3.00 + time * 0.33); }
	p = rot2(length(p) * 1.57 + time * 0.29) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.23 + time * 0.16);
	col = fract(col * 1.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
