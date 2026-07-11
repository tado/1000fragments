uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.11 + sin(p.y * 5.23 + t * 1.84) * 3.33 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.52;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.10 * p.y + time * 0.88); p.y += 0.48 / wf * cos(wf * 3.29 * p.x + time * 1.26); }
	{ float fr = length(p); p *= 1.0 + 0.48 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.18, vec3(0.57, 0.42, 0.46), vec3(0.41, 0.50, 0.39), vec3(1.17, 1.28, 1.18), vec3(0.41, 0.04, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
