uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.97 + vec2(t * 0.59, -t * 0.59) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.24), field(p, time, 2.48));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
