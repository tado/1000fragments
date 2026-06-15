uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.52 + t * 4.21 + ph) + sin(p.y * 12.99 - t * 4.21 + ph)
        + sin((p.x + p.y) * 4.65 + t * 4.21 + ph) + sin(length(p) * 6.03 - t * 4.21 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.14, 1.12, 1.40) + vec3(0.11, 0.09, 0.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
