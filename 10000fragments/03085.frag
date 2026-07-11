uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.46 + vec2(t * 2.86, -t * 2.86) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.03, 0.49, 0.55), vec3(0.96, 0.76, 0.40), d);
	col = fract(col * 1.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
