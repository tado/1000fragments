uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.03 + t * 2.28 + ph) + sin(p.y * 8.49 - t * 2.28 + ph)
        + sin((p.x + p.y) * 2.97 + t * 2.28 + ph) + sin(length(p) * 7.16 - t * 2.28 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.67;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.32, 0.29), vec3(0.92, 0.89, 0.66), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
