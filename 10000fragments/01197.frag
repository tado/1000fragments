uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.59 + t * 4.35 + ph) + sin(p.y * 5.57 - t * 4.35 + ph)
        + sin((p.x + p.y) * 3.49 + t * 4.35 + ph) + sin(length(p) * 8.12 - t * 4.35 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 1.03 + time * 1.01) * p;
	{ float fr = length(p); p *= 1.0 + -0.40 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.40), field(p, time, 2.80));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.18 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
