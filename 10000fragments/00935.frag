uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.96 + t * 3.58 + ph) + sin(p.y * 7.01 - t * 3.58 + ph)
        + sin((p.x + p.y) * 11.49 + t * 3.58 + ph) + sin(length(p) * 4.05 - t * 3.58 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.05;
	p *= 2.86;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 1.70 * p.y + time * 1.93); p.y += 0.28 / wf * cos(wf * 2.99 * p.x + time * 1.31); }
	p = rot2(0.31) * p;
	p = rot2(length(p) * 3.15 + time * 0.98) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.97 + time * 0.14, vec3(0.57, 0.52, 0.50), vec3(0.38, 0.39, 0.32), vec3(0.75, 1.24, 1.06), vec3(0.61, 0.88, 0.09));
	col = clamp((col - 0.5) * 2.04 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
