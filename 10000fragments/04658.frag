uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.77 + sr * 17.55 - t * 3.95 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.35;
	{ p = vec2(atan(p.y, p.x) * 2.80, length(p) * 2.81 - time * 0.41); }
	p = rot2(time * 0.50) * p;
	p += vec2(0.32, 0.69) * sin(length(p) * 2.26 - time * 1.89) * 0.25;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.35), field(p, time, 0.70));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
