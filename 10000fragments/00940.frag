uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.43 + t * 1.85 + ph) + sin(p.y * 4.21 - t * 1.85 + ph)
        + sin((p.x + p.y) * 7.07 + t * 1.85 + ph) + sin(length(p) * 15.54 - t * 1.85 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	p += vec2(0.17, 0.36) * sin(length(p) * 5.20 - time * 1.65) * 0.20;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.59), field(p, time, 1.18));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.29, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
