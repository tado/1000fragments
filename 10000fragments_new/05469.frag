uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.59 + 0.32 * pow(abs(cos(ra * 7.0 + t * 1.27)), 2.43);
    v = sin((rr - pet) * 22.29 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.64;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.03 / 3.1415927, 0.40 / r + time * 0.70);
	tv.x += tv.y * 0.13;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.15, 0.17, 0.87) * (0.14 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 2.86, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
