uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.11 - t * 0.31;
    v = sin(floor(lv * 4.2) / 4.2 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(0.60) * p;
	p += vec2(-0.66, -0.37) * sin(length(p) * 4.12 - time * 2.36) * 0.20;
	{ p = vec2(atan(p.y, p.x) * 1.72, length(p) * 2.69 - time * 0.51); }
	p = rot2(time * -1.03) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.63), field(p, time, 1.26));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
