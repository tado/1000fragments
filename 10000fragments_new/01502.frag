uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.39 + ph), sin(lt * 1.0 + t * 0.47)) * 0.82;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.84) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.26) * p;
	p = abs(p) - 0.22;
	p = rot2(2.06) * p;
	p += vec2(0.30, 0.85) * sin(length(p) * 4.80 - time * 1.86) * 0.32;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.23, 0.26, 0.19) * (0.22 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.22 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
