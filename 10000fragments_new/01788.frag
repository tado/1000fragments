uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 30.67 - t * 8.44 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.11;
	p *= 1.68;
	p = rot2(p.y * -2.20 + time * 0.91) * p;
	{ p = vec2(atan(p.y, p.x) * 1.43, length(p) * 5.63 - time * 0.41); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.32), field(p, time, 0.64));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
