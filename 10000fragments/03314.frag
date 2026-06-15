uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.94 + vec2(t * 2.51, -t * 2.51) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	p = abs(p) - 0.67;
	p += vec2(-0.76, -0.20) * sin(length(p) * 2.50 - time * 0.62) * 0.20;
	p = rot2(p.y * -3.92 + time * 0.47) * p;
	p = fract(p * 1.17) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.31, 1.42, 0.52) + vec3(0.27, 0.19, 0.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
