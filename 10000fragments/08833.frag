uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.62 + sin(p.y * 5.32 + t * 1.27) * 2.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.28;
	p = fract(p * 1.97) - 0.5;
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.86), field(p, time, 1.71));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.16 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
