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
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.59 + ph), sin(lt * 1.0 + t * 0.43)) * 0.90;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.23) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.91 * sin(mf + 3.0) + ph), cos(t * 1.43 * cos(mf + 3.0) + ph));
        ms += 0.042 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -3.86 + time * 0.23) * p;
	p += vec2(-0.33, -0.58) * sin(length(p) * 2.16 - time * 1.23) * 0.26;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.93; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.41);
	float d = d1 + d2;
	vec3 col = palette(d * 1.55 + time * 0.07, vec3(0.55, 0.51, 0.58), vec3(0.32, 0.30, 0.48), vec3(1.23, 1.27, 1.36), vec3(0.55, 0.06, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
