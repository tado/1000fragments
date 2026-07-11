uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.90 + t * 3.04 + ph) + sin(p.y * 8.63 - t * 3.04 + ph)
        + sin((p.x + p.y) * 5.61 + t * 3.04 + ph) + sin(length(p) * 9.75 - t * 3.04 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.67;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.14, 0.20, 0.10), vec3(0.80, 0.59, 1.00), d);
	col = fract(col * 2.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
