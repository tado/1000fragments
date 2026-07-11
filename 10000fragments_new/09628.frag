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
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.85 + ph), sin(lt * 5.0 + t * 1.23)) * 0.60;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.23) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.57), cos(time * 0.91)) * 0.09;
	float an = atan(p.y, p.x) + time * -0.73;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.94 / 3.1415927, 1.29 / r + time * 0.98);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.49 + time * 0.09, vec3(0.57, 0.55, 0.53), vec3(0.40, 0.35, 0.43), vec3(0.87, 1.18, 1.11), vec3(0.75, 0.21, 0.97));
	col *= clamp(r * 2.01, 0.0, 1.0);
	col = fract(col * 2.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
