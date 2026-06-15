uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.31 + t * 0.72 + ph) + sin(p.y * 7.53 - t * 0.72 + ph)
        + sin((p.x + p.y) * 8.19 + t * 0.72 + ph) + sin(length(p) * 17.94 - t * 0.72 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.14;
	p = rot2(length(p) * 3.49 + time * 0.58) * p;
	{ p = vec2(atan(p.y, p.x) * 1.52, length(p) * 2.66 - time * 0.56); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.08, lr * 2.20 + time * -0.46); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.92 + time * 0.01);
	col = mod(col * 1.35, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
