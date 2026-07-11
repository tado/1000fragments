uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.86 + sr * 5.73 - t * 3.13 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.89;
	p = rot2(p.y * -2.04 + time * 0.22) * p;
	{ p = vec2(atan(p.y, p.x) * 2.84, length(p) * 2.93 - time * 0.77); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.88, 1.12, 1.41) + vec3(0.30, 0.06, 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
