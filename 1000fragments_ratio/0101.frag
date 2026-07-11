uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.31 * pow(abs(cos(ra * 3.0 + t * 1.22)), 1.29);
    v = sin((rr - pet) * 17.70 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.14, length(p) * 5.46 - (time * 0.63) * 0.44); }
	p = rot2((time * 0.63) * -0.99) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.05 * p.y + (time * 0.63) * 1.14); p.y += 0.46 / wf * cos(wf * 2.53 * p.x + (time * 0.63) * 1.72); }
	float d = 0.5 + 0.5 * field(p, (time * 0.63), 0.0);
	vec3 col = mix(vec3(0.09, 0.08, 0.05), vec3(0.68, 0.77, 0.84), d);
	col = clamp((col - 0.5) * 1.26 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.33);
	col = clamp(col, 0.0, 1.0) * vec3(0.974, 1.007, 0.958) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
