uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.57 - t * 4.68 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.73) * 0.79), cos((time * 0.73) * 0.55)) * 0.14;
	p *= 1.55;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.09 / 3.1415927, 1.02 / r - (time * 0.73) * 0.51);
	tv.x += tv.y * 0.28;
	float d = field(tv, (time * 0.73), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.54, 0.62, 0.47) + vec3(0.08, 0.03, 0.09);
	col *= clamp(r * 1.99, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col = clamp(col, 0.0, 1.0) * vec3(1.005, 0.946, 1.002) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
