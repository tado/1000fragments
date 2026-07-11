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
    v = 0.5 * (sin(p.x * 15.44 + t * 1.56 + ph) + sin(p.y * 3.24 - t * 1.23 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 14.78);
    float gsh = hash21(vec2(grow, floor(t * 6.30))) - 0.5;
    float gx = p.x + gsh * 0.93;
    v = sin(gx * 18.75 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.40));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.03;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.51; p = rot2(0.40) * p; }
	p.x += sin(p.y * 7.39 + time * 3.32) * 0.39;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 3.17 * p.y + time * 1.85); p.y += 0.27 / wf * cos(wf * 3.15 * p.x + time * 1.89); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.52);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.14 + time * 0.13, vec3(0.42, 0.60, 0.50), vec3(0.43, 0.41, 0.41), vec3(1.05, 1.34, 0.83), vec3(0.86, 0.46, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
