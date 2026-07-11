uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.18);
    float gsh = hash21(vec2(grow, floor(t * 4.94))) - 0.5;
    float gx = p.x + gsh * 0.89;
    v = sin(gx * 6.66 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.70));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.67;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 2.25 * p.y + time * 1.69); p.y += 0.39 / wf * cos(wf * 2.14 * p.x + time * 0.79); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.00, vec3(0.55, 0.48, 0.48), vec3(0.48, 0.35, 0.43), vec3(1.04, 1.03, 1.40), vec3(0.24, 0.52, 0.76));
	col = fract(col * 1.93);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
