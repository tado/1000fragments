uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.30 - t * 8.18 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 4.83 + time * 3.28) * 0.11;
	p = (floor(p * 13.6) + 0.5) / 13.6;
	{ float fr = length(p); p *= 1.0 + -0.35 * fr * fr; }
	p = fract(p * 2.45) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.94, 1.09, 1.34) + vec3(0.14, 0.25, 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
