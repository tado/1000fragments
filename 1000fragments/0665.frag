uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.01 + vec2(t * 2.33, -t * 2.33) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -1.24 + time * 0.98) * p;
	p = rot2(2.96) * p;
	p = rot2(time * -1.07) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.83), field(p, time, 1.66));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
