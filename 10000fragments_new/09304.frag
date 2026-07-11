uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.67 + sin(p.y * 1.43 + t * 4.45) * 4.27 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.18, length(p) * 2.95 - time * 0.89); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.53; p = rot2(2.26) * p; }
	p = rot2(p.y * 2.26 + time * 0.20) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.06), field(p, time, 2.13));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
