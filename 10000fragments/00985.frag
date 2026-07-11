uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.31 + t * 2.19 + ph) + sin(p.y * 8.68 - t * 2.19 + ph)
        + sin((p.x + p.y) * 5.15 + t * 2.19 + ph) + sin(length(p) * 7.16 - t * 2.19 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.01, 0.28, 0.45), vec3(0.81, 0.76, 0.77), d);
	col = clamp((col - 0.5) * 1.87 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
