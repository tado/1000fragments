uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.51 - t * 2.95 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	p = abs(p) - 0.48;
	p *= 2.83;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.25, 1.22, 1.01) + vec3(0.19, 0.03, 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
