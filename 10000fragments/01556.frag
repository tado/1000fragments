uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.56 + vec2(t * 0.99, -t * 0.99) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.59; p = rot2(1.41) * p; }
	p += vec2(0.18, 0.22) * sin(length(p) * 2.78 - time * 0.65) * 0.18;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.08 * p.y + time * 1.88); p.y += 0.49 / wf * cos(wf * 2.58 * p.x + time * 1.63); }
	p = rot2(p.y * 1.87 + time * 0.25) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.43 + time * 0.16);
	col = fract(col * 2.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
