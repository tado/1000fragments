uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.09 + t * 4.64 + ph) + sin(p.y * 12.70 - t * 4.64 + ph)
        + sin((p.x + p.y) * 4.77 + t * 4.64 + ph) + sin(length(p) * 6.21 - t * 4.64 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.34;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 2.04;
	{ p = vec2(atan(p.y, p.x) * 2.57, length(p) * 5.08 - time * 0.37); }
	{ float fr = length(p); p *= 1.0 + -0.23 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.34), field(p, time, 0.68));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.04, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
