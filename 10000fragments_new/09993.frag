uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.59 + vec2(t * 0.36, -t * 2.18) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.90;
	{ float fr = length(p); p *= 1.0 + 0.30 * fr * fr; }
	p = (floor(p * 10.7) + 0.5) / 10.7;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.54), field(p, time, 1.07));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
