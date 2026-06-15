uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.11 + t * 3.44 + ph) + sin(p.y * 15.54 - t * 5.80 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.11 * cos(sa * 6 + t * 2.55 + ph);
    v = sin((sr - petal) * 17.25);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.48;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 3.55 * p.y + time * 1.34); p.y += 0.23 / wf * cos(wf * 3.26 * p.x + time * 1.94); }
	p = fract(p * 1.36) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.03);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.23 + time * 0.08, vec3(0.42, 0.43, 0.56), vec3(0.46, 0.42, 0.47), vec3(1.40, 1.16, 0.97), vec3(0.74, 0.24, 0.80));
	col = mod(col * 2.10, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
