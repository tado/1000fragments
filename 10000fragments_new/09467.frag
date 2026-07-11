uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.20 - t * 1.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.71;
	p += vec2(-0.54, -0.40) * sin(length(p) * 5.89 - time * 0.84) * 0.12;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.07), field(p, time, 2.13));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
