uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.89 + vec2(t * 2.37, -t * 0.32) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.29;
	p.x += sin(p.y * 7.63 + time * 2.58) * 0.22;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.50, 0.16, 0.53) * (0.17 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col *= 0.85 + 0.13 * sin(gl_FragCoord.y * 2.98 + time * 13.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
