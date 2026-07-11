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
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.20 + ph), sin(lt * 3.0 + t * 0.69)) * 0.70;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.52) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.05) * p * 13.21;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.59;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = palette(d * 0.50 + time * 0.10, vec3(0.55, 0.46, 0.45), vec3(0.47, 0.30, 0.32), vec3(0.72, 1.14, 1.12), vec3(0.57, 0.35, 0.44)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
