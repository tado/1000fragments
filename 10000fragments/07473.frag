uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.63;
    float pk = 6.2831853 / 8.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 15.16 - t * 3.49 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.80), cos(time * 0.68)) * 0.30;
	float an = atan(p.y, p.x) + time * -0.73;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.28 / 3.1415927, 1.23 / r - time * 0.62);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.45, 1.15, 1.47) + vec3(0.22, 0.05, 0.18);
	col *= clamp(r * 1.40, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
