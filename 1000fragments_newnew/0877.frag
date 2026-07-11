uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 14.28 - t * 3.05 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 25.40 - t * 1.41 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.58) * 0.65), cos((time * 0.58) * 1.25)) * 0.06;
	float an = atan(p.y, p.x) + (time * 0.58) * -0.63;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.69 / 3.1415927, 1.13 / r + (time * 0.58) * 1.96);
	tv.x += tv.y * 0.13;
	float d = field(tv, (time * 0.58), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.26, 0.46, 0.33), vec3(0.64, 0.78, 0.77), smoothstep(0.0, 1.0, cc));
	col *= clamp(r * 2.68, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.57));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(1.010, 0.993, 1.002) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
