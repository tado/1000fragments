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
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.72 + jf * 4.0), cos(t * 0.14 * jf)) * 0.83;
        xs += sin(length(p - im) * 214.48 - t * 10.01 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.23;
	p = rot2(3.04) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 2.78 * p.y + time * 1.47); p.y += 0.50 / wf * cos(wf * 3.43 * p.x + time * 1.98); }
	p += vec2(-0.69, 0.31) * sin(length(p) * 2.14 - time * 0.75) * 0.31;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.15, vec3(0.56, 0.49, 0.48), vec3(0.43, 0.38, 0.49), vec3(1.24, 1.20, 0.97), vec3(0.76, 0.18, 0.37));
	col = clamp((col - 0.5) * 1.85 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
