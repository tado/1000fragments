uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.27 + sr * 16.13 - t * 3.31 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.99;
	{ float fr = length(p); p *= 1.0 + -0.79 * fr * fr; }
	p = fract(p * 1.76) - 0.5;
	p = abs(p);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 2.42 * p.y + time * 1.01); p.y += 0.27 / wf * cos(wf * 3.80 * p.x + time * 1.61); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.57 + time * 0.04, vec3(0.49, 0.53, 0.59), vec3(0.38, 0.41, 0.41), vec3(0.74, 1.30, 0.79), vec3(0.94, 0.42, 0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
