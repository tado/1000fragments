uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.30 + sr * 11.10 - t * 3.74 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.96;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.57 * p.y + time * 1.00); p.y += 0.41 / wf * cos(wf * 3.38 * p.x + time * 1.40); }
	p = rot2(time * -0.41) * p;
	p = rot2(p.y * -2.23 + time * 0.78) * p;
	{ p = vec2(atan(p.y, p.x) * 2.49, length(p) * 5.49 - time * 0.77); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.08 + time * 0.26);
	col = fract(col * 2.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
