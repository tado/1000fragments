uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.32 + vec2(t * 0.63, -t * 2.35) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.01;
	p *= 3.14;
	p = (floor(p * 23.3) + 0.5) / 23.3;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.35, 0.12), vec3(0.76, 0.59, 0.55), d);
	col = fract(col * 2.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
