uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.96 + 0.36 * sin(t * 0.99)) + vec2(-0.62, 0.28) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 21; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 21.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.94, t * 0.62 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.36) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.34 * p.y + time * 1.33); p.y += 0.41 / wf * cos(wf * 1.59 * p.x + time * 1.54); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.43);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.24 + time * 0.18, vec3(0.51, 0.51, 0.45), vec3(0.33, 0.47, 0.31), vec3(0.79, 0.83, 0.99), vec3(0.76, 0.24, 0.53));
	col = fract(col * 1.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
