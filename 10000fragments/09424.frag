uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.17 - t * 5.99 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.85 + jf * 4.0), cos(t * 0.38 * jf)) * 0.94;
        xs += sin(length(p - im) * 119.01 - t * 8.29 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.87;
	p *= 2.10;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 3.61 * p.y + time * 1.15); p.y += 0.37 / wf * cos(wf * 2.62 * p.x + time * 1.05); }
	p = rot2(length(p) * -1.99 + time * 1.17) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.11);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.52 + time * 0.24, vec3(0.44, 0.47, 0.45), vec3(0.41, 0.38, 0.38), vec3(1.15, 0.98, 0.79), vec3(0.33, 0.21, 0.22));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
