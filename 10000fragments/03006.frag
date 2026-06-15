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
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.31 * sin(mf + 3.0) + ph), cos(t * 1.31 * cos(mf + 3.0) + ph));
        ms += 0.062 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.62;
	{ p = vec2(atan(p.y, p.x) * 1.54, length(p) * 3.13 - time * 0.33); }
	p = rot2(time * -0.97) * p;
	p = rot2(length(p) * 1.36 + time * 0.61) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 2.24 * p.y + time * 0.94); p.y += 0.50 / wf * cos(wf * 1.99 * p.x + time * 1.28); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.84 + time * 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
