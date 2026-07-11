uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.54 + ph), sin(lt * 2.0 + t * 1.36)) * 0.54;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.10) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.60), cos(time * 1.25)) * 0.14;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.53 / 3.1415927, 1.03 / r - time * 2.77);
	tv.x += tv.y * 0.13;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.95 + time * 0.19);
	col *= clamp(r * 1.46, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
