uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.89 + vec2(t * 2.62, -t * 2.62) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 1.65, length(p) * 5.77 - time * 0.23); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.35, 0.38, 0.48), vec3(0.89, 0.62, 0.74), d);
	col = fract(col * 2.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
