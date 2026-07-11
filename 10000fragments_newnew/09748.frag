uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.54;
    float pk = 6.2831853 / 6.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 15.32 - t * 1.87 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.61;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.03 / 3.1415927, 1.20 / r + time * 2.50);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.26, 0.15, 0.13), vec3(0.60, 0.94, 0.57), cc);
	col *= clamp(r * 1.80, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
