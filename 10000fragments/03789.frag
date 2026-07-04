uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.86 + vec2(t * 2.14, -t * 2.21) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.20;
	p = rot2(p.y * 1.44 + time * 0.99) * p;
	p = rot2(time * 0.42) * p;
	p = rot2(length(p) * 2.95 + time * 1.21) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.43, 0.16, 0.04), vec3(0.64, 0.95, 0.60), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
