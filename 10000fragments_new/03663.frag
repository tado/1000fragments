uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.50 + t * 0.85 + ph) + sin(p.y * 8.34 - t * 1.74 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.35), cos(time * 0.89)) * 0.10;
	float an = atan(p.y, p.x) + time * -0.35;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.61 / 3.1415927, 0.50 / r - time * 2.97);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.88, 1.38, 0.84) + vec3(0.19, 0.22, 0.13);
	col *= clamp(r * 1.79, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
