uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.69;
    float pk = 6.2831853 / 4.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 14.43 - t * 3.74 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.63) * 1.11), cos((time * 0.63) * 1.22)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.27 / 3.1415927, 0.97 / r - (time * 0.63) * 1.66);
	tv.x += tv.y * 0.31;
	float d = field(tv, (time * 0.63), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.00, 0.01, 0.10), vec3(0.58, 0.58, 0.54), cc);
	col *= clamp(r * 2.19, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.05 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.939, 0.995, 1.042) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
