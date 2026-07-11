uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.14 + sin(p.y * 4.55 + t * 1.52) * 3.87 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.69;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.21 / 3.1415927, 0.43 / r + time * 0.78);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.07, 0.36), vec3(0.81, 0.61, 0.80), cc);
	col *= clamp(r * 2.77, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
