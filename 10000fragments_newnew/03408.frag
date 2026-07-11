uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.28 * pow(abs(cos(ra * 5.0 + t * 2.06)), 2.29);
    v = sin((rr - pet) * 8.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.26;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.23 / 3.1415927, 0.42 / r - time * 2.87);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.67 + time * 0.19);
	col *= clamp(r * 1.19, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.90 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
