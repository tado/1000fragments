uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.07 - t * 5.08 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.16 * cos(sa * 3.0 + t * 0.62 + ph);
    v = sin((sr - petal) * 15.45);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.61;
	p += vec2(0.08, -0.00) * sin(length(p) * 5.23 - time * 2.10) * 0.20;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.78 * p.y + time * 1.28); p.y += 0.29 / wf * cos(wf * 1.87 * p.x + time * 2.18); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.49);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.57 + time * 0.15, vec3(0.42, 0.53, 0.56), vec3(0.31, 0.44, 0.35), vec3(1.30, 1.09, 0.91), vec3(0.75, 0.50, 0.75));
	col = mod(col * 2.18, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
