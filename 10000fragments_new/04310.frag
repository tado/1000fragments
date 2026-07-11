uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.35 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.13 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 8.11) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 7.88);
    float gsh = hash21(vec2(grow, floor(t * 3.75))) - 0.5;
    float gx = p.x + gsh * 0.85;
    v = sin(gx * 12.56 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.19));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.99);
	float d = d1 + d2;
	vec3 col = palette(d * 0.97 + time * 0.05, vec3(0.44, 0.52, 0.47), vec3(0.46, 0.49, 0.50), vec3(1.20, 1.39, 0.98), vec3(0.41, 0.14, 0.65));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.78 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
