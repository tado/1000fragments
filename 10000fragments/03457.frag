uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.43, t * 1.45 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.84;
	{ float fr = length(p); p *= 1.0 + 0.48 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.62, length(p) * 4.66 - time * 0.70); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.37; p = rot2(1.23) * p; }
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.91), field(p, time, 1.82));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.69, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
