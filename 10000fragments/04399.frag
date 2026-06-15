uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.26 + jf * 4.0), cos(t * 0.17 * jf)) * 0.72;
        xs += sin(length(p - im) * 183.74 - t * 7.17 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.47 + t * 1.96 + ph) + sin(p.y * 2.52 - t * 1.96 + ph)
        + sin((p.x + p.y) * 2.58 + t * 1.96 + ph) + sin(length(p) * 4.47 - t * 1.96 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 3.98 * p.y + time * 0.75); p.y += 0.47 / wf * cos(wf * 2.68 * p.x + time * 1.56); }
	{ p = vec2(atan(p.y, p.x) * 2.90, length(p) * 3.11 - time * 0.59); }
	p = rot2(1.82) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.15);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.56 + time * 0.05, vec3(0.48, 0.48, 0.56), vec3(0.41, 0.46, 0.33), vec3(0.92, 0.92, 0.84), vec3(0.83, 0.31, 0.73));
	col = clamp((col - 0.5) * 1.74 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
