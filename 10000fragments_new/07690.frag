uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.59 + vec2(t * 1.50, -t * 2.69) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.58;
	p.x += sin(p.y * 2.07 + time * 3.15) * 0.22;
	p = (floor(p * 30.0) + 0.5) / 30.0;
	p *= 2.90;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.08), field(p, time, 2.17));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
