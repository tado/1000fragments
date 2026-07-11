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
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.85 + ph), sin(lt * 3.0 + t * 1.08)) * 0.93;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.91) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.27), cos(time * 0.77)) * 0.09;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.67 / 3.1415927, 0.93 / r - time * 0.68);
	tv.x += tv.y * 0.48;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.88 + time * 0.04, vec3(0.43, 0.58, 0.54), vec3(0.41, 0.34, 0.45), vec3(0.92, 1.12, 1.34), vec3(0.31, 0.66, 0.77));
	col *= clamp(r * 2.32, 0.0, 1.0);
	col = mod(col * 1.92, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
