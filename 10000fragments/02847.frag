uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.30 + vec2(t * 2.06, -t * 2.06) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.52, length(p) * 2.97 - time * 0.52); }
	p += vec2(0.19, -0.33) * sin(length(p) * 3.59 - time * 1.91) * 0.11;
	p = abs(p) - 0.67;
	p = fract(p * 1.40) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.49), field(p, time, 0.98));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
