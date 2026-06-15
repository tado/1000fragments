uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.57 + t * 2.55 + ph) + sin(p.y * 3.51 - t * 2.55 + ph)
        + sin((p.x + p.y) * 4.23 + t * 2.55 + ph) + sin(length(p) * 17.12 - t * 2.55 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.55), field(p, time, 1.11));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
