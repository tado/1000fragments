uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.33 * pow(abs(cos(ra * 3.0 + t * 2.05)), 1.66);
    v = sin((rr - pet) * 12.41 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.51), cos(time * 0.77)) * 0.29;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.32 / 3.1415927, 0.63 / r + time * 2.82);
	tv.x += tv.y * 0.23;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.03, 0.02), vec3(0.73, 0.97, 0.53), cc);
	col *= clamp(r * 2.72, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.58 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
