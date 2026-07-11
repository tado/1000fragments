uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.65 + sin(p.y * 5.88 + t * 2.05) * 3.62 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.78;
	p = rot2(1.80) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.48; p = rot2(1.90) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 2.74, length(p) * 5.08 - time * 0.36); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.15), field(p, time, 2.30));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.12 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
