uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.89 - t * 1.82 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.56;
	{ p = vec2(atan(p.y, p.x) * 1.66, length(p) * 2.18 - time * 0.54); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.13), field(p, time, 2.25));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
