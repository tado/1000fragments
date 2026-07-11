uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.44, 0.0)) * 39.83 - t * 6.95 + ph);
    float mb = sin(length(p + vec2(0.44, 0.0)) * 15.19 - t * 6.95 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.18;
	p = rot2(length(p) * -3.35 + time * 0.73) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 3.70 * p.y + time * 0.69); p.y += 0.49 / wf * cos(wf * 3.82 * p.x + time * 2.00); }
	p = abs(p);
	p = rot2(time * 0.64) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.91, 1.02, 0.96) + vec3(0.20, 0.22, 0.27);
	col = fract(col * 1.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
