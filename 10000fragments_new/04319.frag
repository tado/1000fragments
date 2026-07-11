uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.20 * pow(abs(cos(ra * 5.0 + t * 2.99)), 0.69);
    v = sin((rr - pet) * 11.22 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.33) * p;
	p = rot2(length(p) * 1.87 + time * 0.87) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 3.19 * p.y + time * 1.82); p.y += 0.36 / wf * cos(wf * 3.91 * p.x + time * 1.68); }
	{ p = vec2(atan(p.y, p.x) * 2.75, length(p) * 4.65 - time * 0.82); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.45 + time * 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
