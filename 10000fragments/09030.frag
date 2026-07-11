uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.97 + t * 2.55 + ph) + sin(p.y * 15.37 - t * 0.70 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.48 + jf * 4.0), cos(t * 0.31 * jf)) * 0.88;
        xs += sin(length(p - im) * 202.18 - t * 10.01 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 3.52 + time * 0.95) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.23 * p.y + time * 1.22); p.y += 0.42 / wf * cos(wf * 1.70 * p.x + time * 1.22); }
	p *= 3.17;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.50);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.99 + time * 0.24, vec3(0.58, 0.55, 0.58), vec3(0.38, 0.31, 0.41), vec3(0.93, 1.38, 1.19), vec3(0.94, 0.43, 0.37));
	col = clamp((col - 0.5) * 1.69 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
