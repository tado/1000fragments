uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 22.63 - t * 2.80 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 27.70 - t * 2.80 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.48;
	p = rot2(time * 1.34) * p;
	p += vec2(0.08, 0.20) * sin(length(p) * 3.91 - time * 0.67) * 0.11;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.33 * p.y + time * 0.95); p.y += 0.44 / wf * cos(wf * 3.34 * p.x + time * 0.60); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.82), field(p, time, 1.64));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
