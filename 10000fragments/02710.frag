uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.34 + ph), sin(lt * 5.0 + t * 0.88)) * 0.89;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.63) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.84;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.30) * p * 8.40;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.59;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = palette(d * 1.38 + time * 0.08, vec3(0.40, 0.44, 0.54), vec3(0.31, 0.44, 0.32), vec3(1.15, 1.22, 1.07), vec3(1.00, 0.50, 0.10)) * v;
	col = mod(col * 1.51, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
