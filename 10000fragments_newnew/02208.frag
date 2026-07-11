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
    float lv = length(p) * 2.01 - t * 0.51;
    v = sin(floor(lv * 2.4) / 2.4 * 6.2831853 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.17 + ph), vnoise2(p * 4.17 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.17 + 2.36 * wq + vec2(1.7, 9.2) + t * 0.70),
                   vnoise2(p * 4.17 + 1.38 * wq + vec2(8.3, 2.8) - t * 0.70));
    v = vnoise2(p * 4.17 + 3.09 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.18;
	p *= 1.0 + 0.16 * sin(time * 3.98);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 4.00 * p.y + time * 1.71); p.y += 0.36 / wf * cos(wf * 3.26 * p.x + time * 1.63); }
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.78; }
	p = rot2(2.47) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.15);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.42 + time * 0.06, vec3(0.49, 0.43, 0.55), vec3(0.44, 0.41, 0.32), vec3(0.79, 0.79, 0.76), vec3(0.58, 0.47, 0.42));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
