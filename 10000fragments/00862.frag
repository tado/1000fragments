uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.81 + sin(p.y * 2.73 + t * 2.26) * 2.07 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.25, -0.68) * sin(length(p) * 2.72 - time * 1.63) * 0.13;
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + 0.68 * fr * fr; }
	p = rot2(length(p) * -2.10 + time * 0.90) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.00, 1.50, 0.91) + vec3(0.16, 0.29, 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
