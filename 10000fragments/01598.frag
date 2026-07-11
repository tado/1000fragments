uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.99 - t * 3.24 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.79;
	p = fract(p * 1.56) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.48 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.99, length(p) * 3.49 - time * 0.71); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.54 * p.y + time * 0.65); p.y += 0.24 / wf * cos(wf * 3.07 * p.x + time * 1.49); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.34 + time * 0.24, vec3(0.55, 0.47, 0.56), vec3(0.42, 0.43, 0.46), vec3(0.73, 0.81, 0.97), vec3(0.14, 0.68, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
