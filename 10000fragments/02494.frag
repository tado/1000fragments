uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.27 * cos(sa * 9 + t * 2.18 + ph);
    v = sin((sr - petal) * 10.47);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.28 + t * 0.94 + ph) + sin(p.y * 10.50 - t * 4.88 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 3.75 * p.y + time * 0.81); p.y += 0.49 / wf * cos(wf * 2.78 * p.x + time * 0.81); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.98);
	float d = d1 * d2;
	vec3 col = palette(d * 1.27 + time * 0.30, vec3(0.58, 0.50, 0.57), vec3(0.47, 0.46, 0.32), vec3(1.24, 1.09, 1.24), vec3(0.11, 0.82, 0.38));
	col = fract(col * 2.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
