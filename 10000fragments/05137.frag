uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.78 + t * 3.37 + ph) + sin(p.y * 4.15 - t * 3.37 + ph)
        + sin((p.x + p.y) * 9.27 + t * 3.37 + ph) + sin(length(p) * 7.76 - t * 3.37 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.89, 1.46, 0.92) + vec3(0.29, 0.06, 0.06);
	col = fract(col * 2.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
