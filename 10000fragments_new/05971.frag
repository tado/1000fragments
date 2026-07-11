uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.34 + 0.18 * pow(abs(cos(ra * 7.0 + t * 2.36)), 1.80);
    v = sin((rr - pet) * 12.27 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.42;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.38 / 3.1415927, 0.86 / r - time * 0.73);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.24, 0.64, 0.90) * (0.16 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 2.52, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.62 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
