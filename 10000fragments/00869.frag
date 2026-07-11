uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.41 + sin(p.y * 3.59 + t * 2.10) * 3.82 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.68, 0.57, 1.43) + vec3(0.16, 0.22, 0.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
