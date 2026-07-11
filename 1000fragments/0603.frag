uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.39 + vec2(t * 1.17, -t * 1.17) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.16;
	p += vec2(-0.11, 0.41) * sin(length(p) * 4.63 - time * 1.19) * 0.32;
	p = fract(p * 2.59) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.66), field(p, time, 1.33));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
