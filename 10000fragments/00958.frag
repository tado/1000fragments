uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.49 + t * 1.49 + ph) + sin(p.y * 10.18 - t * 1.49 + ph)
        + sin((p.x + p.y) * 8.56 + t * 1.49 + ph) + sin(length(p) * 5.15 - t * 1.49 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.76) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.09, 0.42, 0.51), vec3(0.77, 0.64, 0.71), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
