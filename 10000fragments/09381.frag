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
        vec2 im = vec2(sin(t * 0.22 + jf * 4.0), cos(t * 0.49 * jf)) * 0.42;
        xs += sin(length(p - im) * 155.19 - t * 6.87 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.42;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 3.24 * p.y + time * 1.01); p.y += 0.39 / wf * cos(wf * 2.58 * p.x + time * 1.69); }
	p *= 2.79;
	p = rot2(0.68) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.68 + time * 0.10, vec3(0.53, 0.60, 0.52), vec3(0.34, 0.42, 0.35), vec3(1.28, 1.36, 1.21), vec3(0.27, 0.35, 0.33));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
