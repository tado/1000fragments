uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.53 + sin(p.y * 3.57 + t * 2.23) * 4.17 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.29;
	p += vec2(0.41, 0.26) * sin(length(p) * 3.00 - time * 1.44) * 0.34;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 2.09 * p.y + time * 0.87); p.y += 0.45 / wf * cos(wf * 1.62 * p.x + time * 1.38); }
	{ p = vec2(atan(p.y, p.x) * 2.83, length(p) * 2.78 - time * 0.22); }
	p = rot2(time * -0.74) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.89), field(p, time, 1.79));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
