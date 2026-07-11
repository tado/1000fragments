uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.00 + sin(p.y * 4.27 + t * 5.45) * 4.89 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.50;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.53 / 3.1415927, 0.82 / r - time * 1.17);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.23, 0.33), vec3(0.96, 0.98, 0.66), cc);
	col *= clamp(r * 1.45, 0.0, 1.0);
	col = fract(col * 1.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
