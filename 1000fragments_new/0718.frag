uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.89 - t * 1.52;
    v = sin(floor(lv * 4.9) / 4.9 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.78;
	p.x += sin(p.y * 7.13 + time * 1.08) * 0.35;
	p = fract(p * 2.14) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.22, 1.27, 1.11) + vec3(0.12, 0.13, 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
