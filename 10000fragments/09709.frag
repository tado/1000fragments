uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.21 + ph), sin(lt * 5.0 + t * 0.70)) * 0.99;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.01) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.19;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.30) * p * 11.63;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.51;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = mix(vec3(0.71, 0.84, 0.72), vec3(0.08, 0.03, 0.18), v);
	col *= 0.86 + 0.15 * sin(gl_FragCoord.y * 2.29 + time * 16.61);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
