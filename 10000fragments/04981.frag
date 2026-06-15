uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.14 - t * 6.11 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.95;
	p = abs(p) - 0.59;
	{ float fr = length(p); p *= 1.0 + 0.71 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.40, 1.36, 0.69) + vec3(0.04, 0.05, 0.23);
	col = mod(col * 1.97, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
