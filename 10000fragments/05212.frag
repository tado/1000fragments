uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.69 - t * 1.49;
    v = sin(floor(lv * 2.4) / 2.4 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.72;
	{ float fr = length(p); p *= 1.0 + -0.69 * fr * fr; }
	p = fract(p * 2.96) - 0.5;
	p = (floor(p * 20.9) + 0.5) / 20.9;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.46, 0.10, 0.50), vec3(0.96, 0.73, 0.69), d);
	col = clamp((col - 0.5) * 2.07 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
