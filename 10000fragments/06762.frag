uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.77 + vec2(t * 1.64, -t * 1.64) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(1.19) * p;
	p = rot2(length(p) * -2.01 + time * 0.48) * p;
	p += vec2(0.02, 0.64) * sin(length(p) * 4.01 - time * 1.16) * 0.28;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.17, 0.27, 0.25), vec3(0.95, 0.85, 0.41), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
