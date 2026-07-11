uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.87 * sin(mf + 3.0) + ph), cos(t * 0.47 * cos(mf + 3.0) + ph));
        ms += 0.098 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.85 + ph), sin(lt * 3.0 + t * 0.93)) * 0.61;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.27) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.87;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.33, lr * 2.34 + time * 0.25); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.47);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.14 + time * 0.05, vec3(0.41, 0.54, 0.44), vec3(0.42, 0.50, 0.41), vec3(1.06, 0.79, 1.25), vec3(0.34, 0.63, 0.15));
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
