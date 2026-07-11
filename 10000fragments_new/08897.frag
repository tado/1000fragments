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
    float grow = floor(p.y * 11.75);
    float gsh = hash21(vec2(grow, floor(t * 5.35))) - 0.5;
    float gx = p.x + gsh * 1.10;
    v = sin(gx * 8.18 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.69));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.50 + sin(p.y * 5.88 + t * 4.17) * 2.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.23;
	{ float fr = length(p); p *= 1.0 + -0.50 * fr * fr; }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.13; p = rot2(0.58) * p; }
	p = abs(p) - 0.74;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 1.99 * p.y + time * 2.19); p.y += 0.45 / wf * cos(wf * 2.46 * p.x + time * 0.62); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.17);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.68 + time * 0.01, vec3(0.59, 0.42, 0.44), vec3(0.30, 0.48, 0.33), vec3(0.95, 1.01, 0.77), vec3(0.53, 0.27, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
