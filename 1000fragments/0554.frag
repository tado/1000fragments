uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.64 + t * 2.66 + ph) + sin(p.y * 11.06 - t * 3.10 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.83 + t * 4.62 + ph) + sin(p.y * 4.86 - t * 3.89 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.37;
	p = abs(p);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.79 * p.y + time * 1.46); p.y += 0.23 / wf * cos(wf * 2.36 * p.x + time * 1.04); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.98);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.36 + time * 0.18, vec3(0.54, 0.56, 0.46), vec3(0.31, 0.41, 0.41), vec3(0.73, 1.27, 0.99), vec3(0.06, 0.58, 0.06));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
