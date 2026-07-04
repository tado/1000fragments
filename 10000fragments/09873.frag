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
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.68 + ph), sin(lt * 5.0 + t * 0.65)) * 0.64;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.15) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.75 * sin(mf + 3.0) + ph), cos(t * 2.47 * cos(mf + 3.0) + ph));
        ms += 0.060 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.91;
	p.x += sin(p.y * 3.13 + time * 3.33) * 0.39;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.98);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.78 + time * 0.04, vec3(0.54, 0.50, 0.52), vec3(0.34, 0.44, 0.39), vec3(1.39, 0.88, 1.31), vec3(0.84, 0.76, 0.08));
	col = mod(col * 2.69, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
