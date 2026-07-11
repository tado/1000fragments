uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.79, t * 1.05 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.12;
	{ p = vec2(atan(p.y, p.x) * 2.41, length(p) * 4.52 - time * 0.50); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.17; p = rot2(0.67) * p; }
	p = abs(p) - 0.34;
	p = rot2(p.y * 3.44 + time * 0.44) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.60), field(p, time, 1.20));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
