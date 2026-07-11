uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 8.60 - t * 1.41 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 21.99 - t * 1.41 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.49;
	{ p = vec2(atan(p.y, p.x) * 1.75, length(p) * 3.10 - time * 0.58); }
	p = abs(p);
	p = rot2(0.86) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.13), field(p, time, 2.25));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.49, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
