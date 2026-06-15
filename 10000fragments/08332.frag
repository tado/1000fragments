uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.87 + t * 4.67 + ph) + sin(p.y * 4.80 - t * 3.07 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -1.51 + time * 0.75) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.55 * p.y + time * 1.99); p.y += 0.41 / wf * cos(wf * 2.50 * p.x + time * 1.25); }
	{ p = vec2(atan(p.y, p.x) * 2.24, length(p) * 4.40 - time * 0.47); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.80 + time * 0.05);
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
