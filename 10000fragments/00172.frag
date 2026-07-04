uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.40 * sin(mf + 3.0) + ph), cos(t * 0.76 * cos(mf + 3.0) + ph));
        ms += 0.040 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.35;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.03 * p.y + time * 0.90); p.y += 0.48 / wf * cos(wf * 2.27 * p.x + time * 1.00); }
	p = rot2(p.y * -3.15 + time * 0.67) * p;
	{ p = vec2(atan(p.y, p.x) * 2.50, length(p) * 5.47 - time * 0.94); }
	p = sin(p * 2.44 + time * 1.22) * 1.30;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.38 + time * 0.03);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
