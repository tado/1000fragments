uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.27 + t * 4.47 + ph) + sin(p.y * 8.92 - t * 3.19 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.02;
	{ p = vec2(atan(p.y, p.x) * 2.14, length(p) * 5.73 - time * 0.49); }
	p *= 2.68;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 3.76 * p.y + time * 0.83); p.y += 0.21 / wf * cos(wf * 2.83 * p.x + time * 0.75); }
	p = rot2(time * 0.78) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.94 + time * 0.14);
	col = fract(col * 2.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
