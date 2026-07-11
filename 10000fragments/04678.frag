uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 37.26 - t * 4.86 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 27.24 - t * 4.86 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.86;
	p = rot2(length(p) * 3.45 + time * 0.33) * p;
	p *= 2.38;
	p = rot2(p.y * 1.48 + time * 0.93) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.05 * p.y + time * 0.72); p.y += 0.24 / wf * cos(wf * 3.94 * p.x + time * 1.43); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.21), field(p, time, 0.42));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
