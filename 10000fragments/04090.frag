uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.60;
    float pk = 6.2831853 / 6.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 15.71 - t * 3.08 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.45), cos(time * 1.38)) * 0.11;
	float an = atan(p.y, p.x) + time * -0.38;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.47 / 3.1415927, 0.54 / r - time * 2.44);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.29, 0.29), vec3(0.85, 0.90, 0.99), cc);
	col *= clamp(r * 2.88, 0.0, 1.0);
	col *= 0.87 + 0.10 * sin(gl_FragCoord.y * 0.97 + time * 16.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
