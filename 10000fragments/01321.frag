uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.22 + t * 1.74 + ph) + sin(p.y * 13.17 - t * 1.74 + ph)
        + sin((p.x + p.y) * 11.21 + t * 1.74 + ph) + sin(length(p) * 14.78 - t * 1.74 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.77) * p;
	{ float fr = length(p); p *= 1.0 + -0.24 * fr * fr; }
	p = rot2(p.y * 1.37 + time * 0.17) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 1.99 * p.y + time * 1.05); p.y += 0.38 / wf * cos(wf * 3.42 * p.x + time * 1.53); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.89 + time * 0.27, vec3(0.53, 0.54, 0.59), vec3(0.30, 0.41, 0.35), vec3(0.70, 0.90, 0.73), vec3(0.05, 0.79, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
