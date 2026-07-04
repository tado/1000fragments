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
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.61 + ph), sin(lt * 4.0 + t * 1.15)) * 0.54;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.64) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.57), cos(time * 0.77)) * 0.21;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.53 / 3.1415927, 1.02 / r + time * 2.68);
	tv.x += tv.y * 0.32;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.35, vec3(0.58, 0.54, 0.51), vec3(0.45, 0.50, 0.46), vec3(0.76, 0.78, 0.71), vec3(1.00, 0.02, 0.51));
	col *= clamp(r * 1.96, 0.0, 1.0);
	col *= 0.86 + 0.11 * sin(gl_FragCoord.y * 2.10 + time * 11.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
