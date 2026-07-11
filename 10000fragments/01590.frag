uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.48 - t * 6.27 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.36 * p.y + time * 0.70); p.y += 0.37 / wf * cos(wf * 2.26 * p.x + time * 1.49); }
	p = rot2(p.y * 1.28 + time * 0.52) * p;
	p *= 2.62;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.10 + time * 0.13, vec3(0.46, 0.56, 0.60), vec3(0.42, 0.40, 0.44), vec3(0.81, 0.73, 1.26), vec3(0.75, 0.61, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
