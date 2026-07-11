uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.10 + vec2(t * 0.97, -t * 2.02) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.08 + ph), vnoise2(p * 4.08 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.08 + 1.61 * wq + vec2(1.7, 9.2) + t * 1.17),
                   vnoise2(p * 4.08 + 1.40 * wq + vec2(8.3, 2.8) - t * 0.63));
    v = vnoise2(p * 4.08 + 2.15 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.60;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 3.17 * p.y + time * 2.16); p.y += 0.23 / wf * cos(wf * 3.05 * p.x + time * 0.86); }
	{ p = vec2(atan(p.y, p.x) * 2.28, length(p) * 3.82 - time * 0.31); }
	p = rot2(time * 0.93) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.77 + time * 0.16, vec3(0.46, 0.44, 0.57), vec3(0.46, 0.38, 0.44), vec3(1.35, 1.11, 1.36), vec3(0.29, 0.62, 0.14));
	col *= 0.87 + 0.20 * sin(gl_FragCoord.y * 1.43 + time * 10.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
