uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.39 + sin(p.y * 2.62 + t * 2.04) * 1.77 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.91) - 0.5;
	p *= 2.99;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 2.72 * p.y + time * 0.66); p.y += 0.42 / wf * cos(wf * 3.37 * p.x + time * 1.39); }
	p = rot2(time * -0.55) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.13, vec3(0.53, 0.45, 0.52), vec3(0.41, 0.38, 0.34), vec3(0.79, 1.13, 1.13), vec3(0.03, 0.62, 0.82));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
