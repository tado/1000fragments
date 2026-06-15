uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.72 + t * 3.45 + ph) + sin(p.y * 3.39 - t * 3.45 + ph)
        + sin((p.x + p.y) * 9.32 + t * 3.45 + ph) + sin(length(p) * 15.20 - t * 3.45 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.64 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 1.10, length(p) * 3.37 - time * 0.38); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.24), field(p, time, 2.47));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.88 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
