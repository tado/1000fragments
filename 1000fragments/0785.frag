uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.73 + sin(p.y * 1.17 + t * 3.82) * 4.26 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.13;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.21, 1.34, 0.91) + vec3(0.10, 0.29, 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
