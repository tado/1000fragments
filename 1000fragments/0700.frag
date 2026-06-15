uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.54 + vec2(t * 0.74, -t * 0.74) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 1.13) * p;
	p += vec2(0.35, -0.59) * sin(length(p) * 4.25 - time * 1.56) * 0.29;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.20, 0.65, 0.69) + vec3(0.06, 0.02, 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
