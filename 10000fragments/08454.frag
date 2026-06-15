uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.68 + t * 3.92 + ph) + sin(p.y * 9.03 - t * 1.99 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.78;
	{ float fr = length(p); p *= 1.0 + 0.59 * fr * fr; }
	p += vec2(0.56, -0.93) * sin(length(p) * 4.45 - time * 1.43) * 0.27;
	p = abs(p) - 0.76;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.25), field(p, time, 0.49));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.91 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
