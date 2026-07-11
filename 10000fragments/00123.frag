uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.52 + t * 3.53 + ph) + sin(p.y * 17.22 - t * 1.48 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 1.73 * p.y + time * 1.30); p.y += 0.39 / wf * cos(wf * 2.07 * p.x + time * 1.79); }
	p = rot2(time * -0.50) * p;
	p = abs(p);
	p = rot2(length(p) * -3.60 + time * 1.09) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.90 + time * 0.17, vec3(0.58, 0.42, 0.46), vec3(0.46, 0.44, 0.36), vec3(0.75, 0.88, 0.79), vec3(0.05, 0.46, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
