uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.60 + sin(p.y * 4.82 + t * 5.03) * 3.70 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.54, 0.63) * sin(length(p) * 4.28 - time * 1.63) * 0.16;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 2.44 * p.y + time * 1.48); p.y += 0.32 / wf * cos(wf * 3.05 * p.x + time * 1.45); }
	p = rot2(time * -0.26) * p;
	{ float fr = length(p); p *= 1.0 + -0.27 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.41 + time * 0.01);
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
