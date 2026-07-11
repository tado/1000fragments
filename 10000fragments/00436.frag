uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.36 + t * 5.86 + ph) + sin(p.y * 11.26 - t * 1.72 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.14 + t * 5.80 + ph) + sin(p.y * 16.47 - t * 3.71 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.06 * p.y + time * 1.09); p.y += 0.23 / wf * cos(wf * 3.97 * p.x + time * 1.33); }
	p = abs(p) - 0.65;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.05);
	float d = d1 * d2;
	vec3 col = palette(d * 1.42 + time * 0.12, vec3(0.43, 0.44, 0.43), vec3(0.31, 0.46, 0.46), vec3(1.17, 1.40, 1.10), vec3(0.47, 0.80, 0.69));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
