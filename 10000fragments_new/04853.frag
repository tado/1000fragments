uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.39 + 0.27 * pow(abs(cos(ra * 6.0 + t * 0.95)), 2.90);
    v = sin((rr - pet) * 16.18 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 1.00 + time * 0.67) * p;
	{ float fr = length(p); p *= 1.0 + -0.56 * fr * fr; }
	p += vec2(-0.83, -0.91) * sin(length(p) * 3.92 - time * 1.17) * 0.22;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.46, 0.57, 0.78) * (0.06 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = mod(col * 1.83, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
