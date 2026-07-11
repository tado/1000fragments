uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.50, t * 1.69 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.94;
	p = rot2(p.y * -1.12 + time * 0.85) * p;
	p = rot2(time * -0.55) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.16; p = rot2(1.85) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.74, length(p) * 5.89 - time * 0.21); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.98), field(p, time, 1.97));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
