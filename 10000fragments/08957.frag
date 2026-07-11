uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.00 + sin(p.y * 1.74 + t * 1.33) * 4.87 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.53 + jf * 4.0), cos(t * 0.40 * jf)) * 0.58;
        xs += sin(length(p - im) * 70.01 - t * 4.42 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.42;
	p = rot2(length(p) * 2.65 + time * 0.48) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 1.55 * p.y + time * 1.28); p.y += 0.27 / wf * cos(wf * 3.32 * p.x + time * 0.63); }
	p = fract(p * 1.78) - 0.5;
	p *= 3.08;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.07);
	float d = d1 + d2;
	vec3 col = palette(d * 1.37 + time * 0.03, vec3(0.47, 0.51, 0.40), vec3(0.44, 0.45, 0.32), vec3(1.02, 1.39, 1.34), vec3(0.13, 0.03, 0.22));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
