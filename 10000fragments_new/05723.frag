uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.64 + t * 2.18 + ph) + sin(p.y * 13.84 - t * 2.18 + ph)
        + sin((p.x + p.y) * 4.50 + t * 2.18 + ph) + sin(length(p) * 16.98 - t * 2.18 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.37;
	p = rot2(time * 0.88) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 3.98 * p.y + time * 1.25); p.y += 0.38 / wf * cos(wf * 1.51 * p.x + time * 1.53); }
	{ p = vec2(atan(p.y, p.x) * 2.37, length(p) * 3.41 - time * 0.84); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.68 + time * 0.21, vec3(0.46, 0.52, 0.45), vec3(0.42, 0.47, 0.33), vec3(1.20, 0.76, 1.33), vec3(0.47, 0.56, 0.19));
	col = mod(col * 1.47, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
