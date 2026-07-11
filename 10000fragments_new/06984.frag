uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.45 + t * 3.17 + ph) + sin(p.y * 7.66 - t * 3.17 + ph)
        + sin((p.x + p.y) * 8.89 + t * 3.17 + ph) + sin(length(p) * 11.21 - t * 3.17 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = (floor(p * 23.9) + 0.5) / 23.9;
	p.y += sin(p.x * 3.98 + time * 2.46) * 0.14;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.62), field(p, time, 1.24));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
