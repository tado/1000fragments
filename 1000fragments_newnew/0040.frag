uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.39 + ph), sin(lt * 5.0 + t * 1.32)) * 0.79;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.52) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.51) * 0.84), cos((time * 0.51) * 0.87)) * 0.26;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.36 / 3.1415927, 0.40 / r + (time * 0.51) * 1.67);
	float d = field(tv, (time * 0.51), 0.0);
	vec3 col = palette((d) * 0.46 + (time * 0.51) * 0.02, vec3(0.42, 0.34, 0.40), vec3(0.14, 0.22, 0.18), vec3(0.88, 0.73, 0.59), vec3(0.84, 0.43, 0.65));
	col *= clamp(r * 1.66, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(1.043, 1.006, 0.924) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
