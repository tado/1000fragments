uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.67 + t * 4.31 + ph) + sin(p.y * 12.94 - t * 4.31 + ph)
        + sin((p.x + p.y) * 2.90 + t * 4.31 + ph) + sin(length(p) * 8.09 - t * 4.31 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 3.47 * p.y + time * 1.87); p.y += 0.24 / wf * cos(wf * 2.70 * p.x + time * 1.83); }
	p = rot2(1.95) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.06, vec3(0.56, 0.42, 0.53), vec3(0.37, 0.36, 0.36), vec3(0.74, 0.74, 0.75), vec3(0.91, 0.40, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
