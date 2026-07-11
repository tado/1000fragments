uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.96 + ph), sin(lt * 5.0 + t * 0.65)) * 0.62;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.75) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.29;
	float d = 0.5 + 0.5 * field(p, (time * 0.66), 0.0);
	vec2 hq = rot2(1.12) * p * 11.53;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.60;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 1.07 + (time * 0.66) * 0.10, vec3(0.38, 0.45, 0.37), vec3(0.13, 0.08, 0.09), vec3(0.45, 0.59, 0.54), vec3(0.63, 0.46, 0.19)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.76));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.35);
	col = clamp(col, 0.0, 1.0) * vec3(1.012, 0.967, 1.021) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
