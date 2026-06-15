uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.27 + t * 1.93 + ph) + sin(p.y * 11.07 - t * 1.93 + ph)
        + sin((p.x + p.y) * 2.08 + t * 1.93 + ph) + sin(length(p) * 13.64 - t * 1.93 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.70;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.47, 0.37), vec3(0.58, 0.93, 0.46), d);
	col = clamp((col - 0.5) * 1.53 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
