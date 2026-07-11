uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.44 + vec2(t * 2.25, -t * 1.03) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.39;
	p = fract(p * 2.34) - 0.5;
	p = (floor(p * 17.2) + 0.5) / 17.2;
	p = abs(p) - 0.43;
	p.x += sin(p.y * 7.61 + time * 1.49) * 0.20;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.17), field(p, time, 2.33));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.99 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
