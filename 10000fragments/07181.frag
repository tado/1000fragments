uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.16 + sin(p.y * 2.69 + t * 3.52) * 1.87 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	p += vec2(-0.93, 0.04) * sin(length(p) * 4.54 - time * 1.00) * 0.23;
	p = rot2(0.33) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 2.70 * p.y + time * 1.88); p.y += 0.27 / wf * cos(wf * 3.53 * p.x + time * 1.57); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.07, 0.74, 1.17) + vec3(0.04, 0.22, 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
