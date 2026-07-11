uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.71 + t * 2.63 + ph) + sin(p.y * 11.42 - t * 3.45 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.71;
	p += vec2(0.77, 0.32) * sin(length(p) * 5.47 - time * 0.74) * 0.32;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.27, 0.51, 1.12) + vec3(0.02, 0.25, 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
