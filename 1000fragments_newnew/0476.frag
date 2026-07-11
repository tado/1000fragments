uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.87 - t * 0.95;
    v = sin(floor(lv * 5.7) / 5.7 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.85;
	p = fract(p * 1.61) - 0.5;
	float d = 0.5 + 0.5 * field(p, (time * 0.55), 0.0);
	vec3 col = mix(vec3(0.07, 0.02, 0.02), vec3(0.74, 0.72, 0.71), d);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.04 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(1.018, 0.971, 1.016) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
