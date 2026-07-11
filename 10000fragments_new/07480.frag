uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 36.60 - t * 6.45 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 36.66 - t * 7.61 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.97), cos(time * 1.40)) * 0.27;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.37 / 3.1415927, 0.89 / r - time * 1.46);
	tv.x += tv.y * 0.21;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.03, 0.14), vec3(0.98, 0.60, 0.74), cc);
	col *= clamp(r * 1.37, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.82 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
