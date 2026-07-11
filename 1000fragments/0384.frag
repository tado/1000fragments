uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.26 + t * 2.56 + ph) + sin(p.y * 10.42 - t * 4.19 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.09;
	p *= 1.54;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 1.69 * p.y + time * 1.05); p.y += 0.20 / wf * cos(wf * 1.96 * p.x + time * 1.57); }
	p = fract(p * 1.21) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.33 + time * 0.01, vec3(0.42, 0.46, 0.58), vec3(0.40, 0.44, 0.33), vec3(0.86, 1.08, 0.84), vec3(0.63, 0.16, 0.29));
	col = mod(col * 2.32, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
