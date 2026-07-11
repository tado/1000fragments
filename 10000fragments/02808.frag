uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.83 + vec2(t * 2.45, -t * 2.45) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.29, 0.27, 0.10), vec3(0.64, 0.82, 0.89), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
