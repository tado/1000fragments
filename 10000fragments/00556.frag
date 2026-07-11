uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.23 + sin(p.y * 3.13 + t * 0.95) * 1.60 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.59 + sin(p.y * 4.13 + t * 2.88) * 3.00 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.21 * p.y + time * 1.05); p.y += 0.31 / wf * cos(wf * 3.45 * p.x + time * 1.32); }
	p = fract(p * 1.94) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.33);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.65 + time * 0.27, vec3(0.43, 0.54, 0.55), vec3(0.45, 0.36, 0.39), vec3(1.07, 0.75, 1.07), vec3(0.99, 0.36, 0.07));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
