uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.37 + t * 1.03) - 0.5) * 2.0;
    v = sin((p.y * 2.52 + zx * 1.68 + t * 2.90) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.78;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.75 / 3.1415927, 1.23 / r - time * 0.80);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.02, 0.19, 0.54), vec3(0.64, 0.85, 0.47), cc);
	col *= clamp(r * 2.87, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
