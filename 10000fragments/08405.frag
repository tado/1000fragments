uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.36 + t * 4.85 + ph) + sin(p.y * 10.75 - t * 4.85 + ph)
        + sin((p.x + p.y) * 11.84 + t * 4.85 + ph) + sin(length(p) * 9.07 - t * 4.85 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.41;
	p = abs(p);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.19, lr * 2.85 + time * 0.67); }
	p = rot2(length(p) * 3.37 + time * 0.45) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.25), field(p, time, 2.49));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
