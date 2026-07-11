uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.85 + ph), sin(lt * 3.0 + t * 0.60)) * 0.94;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.16) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.66;
	float d = 0.5 + 0.5 * field(p, (time * 0.55), 0.0);
	vec2 hq = rot2(0.22) * p * 15.20;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.62;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = mix(vec3(0.09, 0.03, 0.16), vec3(0.78, 0.95, 0.78), v);
	col *= 0.80 + 0.12 * sin(gl_FragCoord.y * 2.68 + (time * 0.55) * 15.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.000, 0.988, 1.009) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
