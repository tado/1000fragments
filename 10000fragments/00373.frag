uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.27 + t * 3.49 + ph) + sin(p.y * 7.89 - t * 3.76 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.68;
	p = rot2(length(p) * -1.94 + time * 0.49) * p;
	{ p = vec2(atan(p.y, p.x) * 2.80, length(p) * 2.61 - time * 0.24); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 2.33 * p.y + time * 1.89); p.y += 0.50 / wf * cos(wf * 3.14 * p.x + time * 1.60); }
	p = rot2(p.y * -1.51 + time * 0.12) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.78 + time * 0.16, vec3(0.59, 0.45, 0.59), vec3(0.50, 0.35, 0.32), vec3(0.73, 1.32, 1.28), vec3(0.94, 0.85, 0.74));
	col = fract(col * 1.89);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
