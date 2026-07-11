uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.58 + vec2(t * 1.41, -t * 1.09) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.52 + ph), sin(lt * 3.0 + t * 1.14)) * 0.61;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.27) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 3.19 + time * 0.88) * p;
	p.x += sin(p.y * 7.85 + time * 1.68) * 0.32;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.33; p = rot2(1.99) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.15);
	float d = d1 * d2;
	vec3 col = palette(d * 0.94 + time * 0.24, vec3(0.41, 0.40, 0.42), vec3(0.44, 0.41, 0.49), vec3(1.32, 0.70, 1.05), vec3(0.71, 0.79, 0.33));
	col = mod(col * 1.51, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
