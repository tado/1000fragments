uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 24.17 - t * 8.17 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.13;
	p += vec2(0.55, -0.84) * sin(length(p) * 4.44 - time * 0.57) * 0.32;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.06), field(p, time, 2.12));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
