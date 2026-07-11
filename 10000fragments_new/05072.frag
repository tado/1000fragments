uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.41 + ph), sin(lt * 2.0 + t * 0.95)) * 0.77;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.75) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	p *= 2.53;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + -0.36 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.32, 1.45, 0.68) + vec3(0.27, 0.19, 0.10);
	col *= 0.84 + 0.11 * sin(gl_FragCoord.y * 2.07 + time * 11.81);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
