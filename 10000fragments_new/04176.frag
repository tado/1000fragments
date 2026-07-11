uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.29 + sin(p.y * 5.37 + t * 1.50) * 2.17 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.39), cos(time * 0.92)) * 0.22;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.53 / 3.1415927, 0.99 / r - time * 1.84);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.04, 0.32), vec3(0.58, 0.62, 0.50), cc);
	col *= clamp(r * 2.73, 0.0, 1.0);
	col = mod(col * 1.28, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
