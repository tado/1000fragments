uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.66 + t * 0.67 + ph) + sin(p.y * 16.05 - t * 4.81 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.07;
	p += vec2(-0.55, 0.76) * sin(length(p) * 4.27 - time * 1.66) * 0.24;
	{ p = vec2(atan(p.y, p.x) * 1.47, length(p) * 3.34 - time * 0.22); }
	p = abs(p);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.00, 0.18, 0.57), vec3(0.51, 0.66, 0.79), d);
	col = clamp((col - 0.5) * 1.82 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
