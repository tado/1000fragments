uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.87 + sin(p.y * 5.73 + t * 3.13) * 1.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.58;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.44, 0.71, 0.65) + vec3(0.16, 0.06, 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
