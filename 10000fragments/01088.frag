uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.18 + t * 4.84 + ph) + sin(p.y * 9.14 - t * 4.84 + ph)
        + sin((p.x + p.y) * 6.87 + t * 4.84 + ph) + sin(length(p) * 4.96 - t * 4.84 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	p = abs(p) - 0.45;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.63), field(p, time, 1.27));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.51 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
