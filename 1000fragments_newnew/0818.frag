uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.61 + t * 1.47) - 0.5) * 2.0;
    v = sin((p.y * 5.54 + zx * 0.89 + t * 0.73) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	float d = 0.5 + 0.5 * field(p, (time * 0.74), 0.0);
	vec3 col = mix(vec3(0.10, 0.02, 0.00), vec3(0.68, 0.59, 0.66), d);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.994, 0.975, 1.023) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
