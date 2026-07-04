uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.16 + vec2(t * 1.42, -t * 2.76) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.28;
	p = rot2(1.54) * p;
	p += vec2(-0.82, 0.09) * sin(length(p) * 5.84 - time * 1.87) * 0.27;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 1.54 * p.y + time * 1.22); p.y += 0.27 / wf * cos(wf * 3.99 * p.x + time * 0.98); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.58, 0.68, 0.15) * (0.20 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
