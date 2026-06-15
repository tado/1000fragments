uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.98 + t * 4.72 + ph) + sin(p.y * 11.77 - t * 3.10 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.15 * p.y + time * 0.73); p.y += 0.37 / wf * cos(wf * 3.00 * p.x + time * 1.18); }
	p = rot2(p.y * -2.50 + time * 0.76) * p;
	p *= 1.86;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.56 + time * 0.00);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
