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
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.49 + jf * 4.0), cos(t * 0.43 * jf)) * 0.55;
        xs += sin(length(p - im) * 101.08 - t * 11.80 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.12;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 3.53 * p.y + time * 1.77); p.y += 0.37 / wf * cos(wf * 1.58 * p.x + time * 1.01); }
	{ p = vec2(atan(p.y, p.x) * 2.04, length(p) * 3.08 - time * 0.60); }
	p = rot2(1.90) * p;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.94 + time * 0.01, vec3(0.45, 0.59, 0.58), vec3(0.49, 0.44, 0.44), vec3(0.74, 0.92, 1.34), vec3(0.85, 0.90, 0.44));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
