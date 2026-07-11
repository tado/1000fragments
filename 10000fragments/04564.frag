uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 29.94 - t * 4.71 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 14.25 - t * 4.71 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.10;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 1.53 * p.y + time * 0.81); p.y += 0.41 / wf * cos(wf * 2.27 * p.x + time * 1.28); }
	p += vec2(-0.66, 0.21) * sin(length(p) * 3.32 - time * 0.91) * 0.16;
	p = rot2(2.31) * p;
	p = rot2(p.y * 1.36 + time * 0.72) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.40), field(p, time, 0.80));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
