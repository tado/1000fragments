uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.82 + t * 2.05 + ph) + sin(p.y * 11.08 - t * 2.05 + ph)
        + sin((p.x + p.y) * 3.02 + t * 2.05 + ph) + sin(length(p) * 9.23 - t * 2.05 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + -0.37 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.43), field(p, time, 0.86));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
