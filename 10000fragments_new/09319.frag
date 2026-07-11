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
    vec2 cq = p * 12.90 + vec2(t * 2.45, -t * 2.81) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.52 + vec2(t * 2.99, -t * 0.66) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	{ float fr = length(p); p *= 1.0 + -0.76 * fr * fr; }
	p = rot2(time * 0.42) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.04 * p.y + time * 1.29); p.y += 0.24 / wf * cos(wf * 2.58 * p.x + time * 1.80); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.24);
	float d = d1 + d2;
	vec3 col = palette(d * 1.37 + time * 0.25, vec3(0.48, 0.47, 0.58), vec3(0.40, 0.33, 0.38), vec3(1.39, 1.28, 0.90), vec3(0.10, 0.49, 0.83));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
