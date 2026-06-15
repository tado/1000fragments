uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 6.37 - t * 5.47 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.19;
	p = abs(p);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 1.99 * p.y + time * 1.89); p.y += 0.41 / wf * cos(wf * 1.77 * p.x + time * 0.80); }
	p += vec2(-0.48, 0.72) * sin(length(p) * 2.61 - time * 1.55) * 0.30;
	p = rot2(length(p) * -2.87 + time * 0.79) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.70 + time * 0.13);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
