uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.04, t * 0.60 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.14;
	{ float fr = length(p); p *= 1.0 + -0.24 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.31), field(p, time, 2.63));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
