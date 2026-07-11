uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.40 + ph), sin(lt * 3.0 + t * 0.58)) * 0.58;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.38) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 2.81;
	p = rot2(length(p) * -1.64 + time * 0.46) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.09, 0.75, 0.77) + vec3(0.19, 0.01, 0.22);
	col = mod(col * 2.68, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
