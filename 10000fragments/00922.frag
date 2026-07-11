uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.78 + t * 0.98 + ph) + sin(p.y * 10.16 - t * 0.98 + ph)
        + sin((p.x + p.y) * 9.60 + t * 0.98 + ph) + sin(length(p) * 3.80 - t * 0.98 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.31) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.39), field(p, time, 2.77));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.23, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
