uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.29 + sin(p.y * 1.19 + t * 1.70) * 2.02 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	{ p = vec2(atan(p.y, p.x) * 2.58, length(p) * 4.71 - time * 0.51); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.08 * p.y + time * 1.71); p.y += 0.28 / wf * cos(wf * 2.66 * p.x + time * 0.80); }
	p += vec2(0.50, -0.67) * sin(length(p) * 3.58 - time * 1.97) * 0.36;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.73 + time * 0.08, vec3(0.41, 0.46, 0.54), vec3(0.31, 0.41, 0.41), vec3(0.92, 1.09, 0.71), vec3(0.11, 0.41, 0.89));
	col = fract(col * 1.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
