uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.45 + t * 4.07 + ph) + sin(p.y * 8.32 - t * 4.07 + ph)
        + sin((p.x + p.y) * 4.14 + t * 4.07 + ph) + sin(length(p) * 15.38 - t * 4.07 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.30;
	p += vec2(0.82, 0.21) * sin(length(p) * 4.86 - time * 1.90) * 0.35;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.67), field(p, time, 1.35));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
