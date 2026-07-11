uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.10, t * 1.65 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.27, length(p) * 4.03 - time * 0.36); }
	p = (floor(p * 13.2) + 0.5) / 13.2;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.29, 0.29, 0.40) * (0.21 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = mod(col * 1.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
