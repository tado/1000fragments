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
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.97 + ph), sin(lt * 2.0 + t * 0.51)) * 0.62;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.73) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.17;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.23) * p * 22.32;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.59;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 0.93 + time * 0.29, vec3(0.58, 0.58, 0.51), vec3(0.33, 0.49, 0.45), vec3(0.74, 1.01, 0.88), vec3(0.04, 0.96, 0.76)) * v;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
