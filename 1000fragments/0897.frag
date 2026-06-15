uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.40 + vec2(t * 0.84, -t * 0.84) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.85;
	p = rot2(time * -0.82) * p;
	p = rot2(length(p) * 1.94 + time * 0.30) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.29, vec3(0.56, 0.42, 0.47), vec3(0.48, 0.35, 0.42), vec3(1.24, 0.80, 0.96), vec3(0.17, 0.15, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
