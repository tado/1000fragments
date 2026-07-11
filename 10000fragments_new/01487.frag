uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.46 + sin(p.y * 4.47 + t * 0.66) * 3.50 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.41) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.18, length(p) * 3.56 - time * 0.58); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.21), field(p, time, 2.42));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.68 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
