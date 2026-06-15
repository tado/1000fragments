uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.86 + sin(p.y * 1.40 + t * 4.63) * 2.19 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	p = fract(p * 1.56) - 0.5;
	p = rot2(1.20) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.55, 1.46, 1.06) + vec3(0.17, 0.09, 0.26);
	col = mod(col * 2.22, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
