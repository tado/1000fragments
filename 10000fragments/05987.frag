uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.24 - t * 8.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.66;
	{ p = vec2(atan(p.y, p.x) * 1.38, length(p) * 5.89 - time * 0.68); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.62), field(p, time, 1.24));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
