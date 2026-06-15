uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.36 + t * 3.64 + ph) + sin(p.y * 4.56 - t * 3.64 + ph)
        + sin((p.x + p.y) * 9.74 + t * 3.64 + ph) + sin(length(p) * 13.85 - t * 3.64 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.20) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.50, 0.89, 0.89) + vec3(0.03, 0.10, 0.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
