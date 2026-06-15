uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.58, t * 1.68 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.76;
	{ p = vec2(atan(p.y, p.x) * 2.07, length(p) * 4.20 - time * 0.23); }
	{ float fr = length(p); p *= 1.0 + -0.50 * fr * fr; }
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.28), field(p, time, 0.55));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
