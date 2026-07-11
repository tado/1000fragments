uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 31.10 - t * 1.36 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 16.22 - t * 1.19 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.90;
	p = rot2(p.y * 2.54 + time * 0.80) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 2.49 * p.y + time * 1.98); p.y += 0.35 / wf * cos(wf * 3.44 * p.x + time * 1.02); }
	p *= 1.0 + 0.26 * sin(time * 3.48);
	p += vec2(0.85, -0.95) * sin(length(p) * 3.08 - time * 1.65) * 0.34;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.26), field(p, time, 2.52));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
