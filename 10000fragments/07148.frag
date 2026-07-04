uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.85 + sin(p.y * 4.81 + t * 2.61) * 1.36 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.52));
	p *= 3.09;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 1.85 * p.y + time * 1.40); p.y += 0.24 / wf * cos(wf * 2.28 * p.x + time * 1.66); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.21, vec3(0.47, 0.51, 0.59), vec3(0.37, 0.44, 0.33), vec3(0.78, 1.21, 1.05), vec3(0.82, 0.48, 0.41));
	col = fract(col * 1.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
