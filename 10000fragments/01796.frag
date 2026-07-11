uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.48 - t * 5.38 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.24;
	p += vec2(-0.16, -0.36) * sin(length(p) * 3.77 - time * 1.66) * 0.11;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.39), field(p, time, 2.77));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
