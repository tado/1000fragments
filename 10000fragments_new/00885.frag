uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.65 * sin(mf + 3.0) + ph), cos(t * 1.95 * cos(mf + 3.0) + ph));
        ms += 0.062 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.50 + ph), sin(lt * 1.0 + t * 1.17)) * 0.90;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.31) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.77);
	float d = d1 + d2;
	vec3 col = palette(d * 1.62 + time * 0.04, vec3(0.60, 0.56, 0.46), vec3(0.49, 0.38, 0.31), vec3(0.77, 0.77, 1.06), vec3(0.00, 0.44, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
