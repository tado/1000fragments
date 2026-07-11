uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.70 + sin(p.y * 3.16 + t * 2.71) * 1.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.85, length(p) * 3.67 - time * 0.53); }
	p = rot2(length(p) * 1.60 + time * 1.06) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.30), field(p, time, 0.59));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
