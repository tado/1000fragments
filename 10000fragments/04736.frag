uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 39.51 - t * 4.33 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 14.58 - t * 4.33 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.23;
	p = rot2(p.y * 3.85 + time * 0.50) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 1.67 * p.y + time * 1.95); p.y += 0.30 / wf * cos(wf * 4.00 * p.x + time * 0.84); }
	{ p = vec2(atan(p.y, p.x) * 2.68, length(p) * 2.67 - time * 0.63); }
	p = fract(p * 1.23) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.35), field(p, time, 0.69));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.85, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
