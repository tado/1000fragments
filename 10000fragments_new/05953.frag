uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.37 + sin(p.y * 3.37 + t * 0.71) * 2.27 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.55;
	p = rot2(time * -1.54) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 1.57 * p.y + time * 1.65); p.y += 0.31 / wf * cos(wf * 3.95 * p.x + time * 1.60); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.68 + time * 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
