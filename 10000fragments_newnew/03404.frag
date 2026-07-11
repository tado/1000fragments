uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.08, t * 1.86 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + 0.73 * fr * fr; }
	p = fract(p * 1.15) - 0.5;
	p = abs(p);
	p = (floor(p * 15.9) + 0.5) / 15.9;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.72, 0.70, 0.38) * (0.25 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
