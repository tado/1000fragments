uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.34 + t * 0.42) - 0.5) * 2.0;
    v = sin((p.y * 4.68 + zx * 1.55 + t * 2.80) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.72;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.98 / 3.1415927, 1.36 / r - time * 1.80);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.33, 0.10, 0.37), vec3(0.96, 0.67, 0.92), cc);
	col *= clamp(r * 2.14, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
