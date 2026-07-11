uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.87 - t * 2.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.50;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 3.46 * p.y + time * 1.30); p.y += 0.38 / wf * cos(wf * 3.86 * p.x + time * 1.06); }
	p += vec2(-0.44, 0.91) * sin(length(p) * 3.83 - time * 1.60) * 0.37;
	p = rot2(p.y * 2.97 + time * 0.84) * p;
	{ p = vec2(atan(p.y, p.x) * 1.81, length(p) * 2.71 - time * 0.75); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.76 + time * 0.13, vec3(0.44, 0.46, 0.56), vec3(0.35, 0.45, 0.36), vec3(0.96, 1.33, 0.78), vec3(0.06, 0.52, 0.46));
	col = fract(col * 1.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
