uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.37;
    float pk = 6.2831853 / 6.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 14.19 - t * 1.71 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.57) * 1.22), cos((time * 0.57) * 1.37)) * 0.16;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.55 / 3.1415927, 1.25 / r + (time * 0.57) * 2.93);
	tv.x += tv.y * 0.15;
	float d = field(tv, (time * 0.57), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.13, 0.03), vec3(0.49, 0.51, 0.56), cc);
	col *= clamp(r * 2.62, 0.0, 1.0);
	col *= 0.81 + 0.20 * sin(gl_FragCoord.y * 2.12 + (time * 0.57) * 17.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(0.998, 1.004, 1.001) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
