uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.61 + ph), sin(lt * 4.0 + t * 1.32)) * 0.76;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.64) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.80;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.25, vec3(0.56, 0.52, 0.43), vec3(0.44, 0.42, 0.49), vec3(0.73, 1.08, 0.96), vec3(0.15, 0.74, 0.01));
	col *= 0.88 + 0.18 * sin(gl_FragCoord.y * 2.11 + time * 17.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
