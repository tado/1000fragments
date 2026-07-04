uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.93 + ph), sin(lt * 5.0 + t * 1.43)) * 0.74;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.42) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.18);
    float gsh = hash21(vec2(grow, floor(t * 8.08))) - 0.5;
    float gx = p.x + gsh * 0.83;
    v = sin(gx * 7.18 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.89));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.37;
	{ float fr = length(p); p *= 1.0 + 0.40 * fr * fr; }
	p = rot2(length(p) * -1.90 + time * 1.18) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.44);
	float d = d1 * d2;
	vec3 col = palette(d * 0.62 + time * 0.19, vec3(0.48, 0.42, 0.41), vec3(0.36, 0.31, 0.48), vec3(1.29, 0.95, 1.29), vec3(0.20, 0.36, 0.80));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.24 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
