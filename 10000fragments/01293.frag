uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.47 + t * 2.31 + ph) + sin(p.y * 11.77 - t * 2.31 + ph)
        + sin((p.x + p.y) * 5.50 + t * 2.31 + ph) + sin(length(p) * 15.84 - t * 2.31 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.42;
	{ float fr = length(p); p *= 1.0 + 0.25 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.76), field(p, time, 1.51));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
