uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.37 - t * 3.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.27, -0.23) * sin(length(p) * 2.64 - time * 1.64) * 0.36;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.58), field(p, time, 1.15));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.34 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
