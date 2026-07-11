uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.91 + sin(p.y * 1.71 + t * 2.80) * 2.81 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.71;
	{ p = vec2(atan(p.y, p.x) * 1.26, length(p) * 2.10 - time * 0.27); }
	p *= 3.18;
	{ float fr = length(p); p *= 1.0 + 0.80 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.18, 0.31, 0.44), vec3(0.66, 0.65, 0.93), d);
	col = clamp((col - 0.5) * 1.51 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
