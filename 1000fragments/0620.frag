uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.58 + ph), sin(lt * 1.0 + t * 1.12)) * 0.98;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.92) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.72;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.30) * p * 9.85;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.71;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = mix(vec3(0.14, 0.05, 0.07), vec3(0.71, 0.98, 0.74), v);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.69 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
