uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.12 + sin(p.y * 3.36 + t * 1.13) * 4.34 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.32;
	p = rot2(p.y * 3.04 + time * 0.87) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.62, lr * 1.32 + time * 0.94); }
	p = rot2(0.93) * p;
	p.y += sin(p.x * 6.74 + time * 1.34) * 0.25;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.70, 0.37, 0.96) * (0.15 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
