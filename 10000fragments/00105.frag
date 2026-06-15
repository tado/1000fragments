uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.12 + t * 4.00 + ph) + sin(p.y * 11.92 - t * 4.00 + ph)
        + sin((p.x + p.y) * 9.51 + t * 4.00 + ph) + sin(length(p) * 13.53 - t * 4.00 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.64;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.43, 0.86, 0.51) + vec3(0.29, 0.04, 0.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
