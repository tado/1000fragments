uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.94 + ph), sin(lt * 3.0 + t * 0.79)) * 0.63;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.21) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.69;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.42 / 3.1415927, 0.77 / r + time * 2.17);
	tv.x += tv.y * 0.44;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.21, 1.00, 0.63) * (0.13 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.89, 0.0, 1.0);
	col = mod(col * 1.53, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
