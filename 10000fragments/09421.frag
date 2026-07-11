uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.07, t * 1.83 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.61 + jf * 4.0), cos(t * 0.18 * jf)) * 0.53;
        xs += sin(length(p - im) * 144.75 - t * 12.75 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.04) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 3.65 * p.y + time * 1.04); p.y += 0.49 / wf * cos(wf * 1.55 * p.x + time * 0.97); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.44);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.66 + time * 0.25, vec3(0.45, 0.41, 0.56), vec3(0.37, 0.31, 0.39), vec3(1.19, 1.07, 0.93), vec3(0.99, 0.47, 0.82));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
