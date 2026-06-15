uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.10 + vec2(t * 1.21, -t * 1.21) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.47;
	p *= 2.03;
	p = rot2(time * -0.80) * p;
	p = rot2(length(p) * -3.83 + time * 0.56) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.94 + time * 0.10, vec3(0.42, 0.59, 0.51), vec3(0.40, 0.46, 0.38), vec3(0.76, 0.90, 1.09), vec3(0.58, 0.03, 0.04));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
