uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.09 + vec2(t * 0.63, -t * 0.63) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.04), field(p, time, 2.09));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.52, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
