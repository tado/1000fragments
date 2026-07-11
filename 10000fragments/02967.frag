uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.49 + vec2(t * 0.55, -t * 0.55) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.87;
	p = rot2(p.y * -2.67 + time * 0.85) * p;
	{ p = vec2(atan(p.y, p.x) * 2.93, length(p) * 5.01 - time * 0.61); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.46), field(p, time, 0.93));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
