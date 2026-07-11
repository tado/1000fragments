uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.39 + 0.19 * pow(abs(cos(ra * 6.0 + t * 0.58)), 1.52);
    v = sin((rr - pet) * 11.82 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.18;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.26 / 3.1415927, 0.31 / r + time * 2.17);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.84, 1.16, 1.40) + vec3(0.04, 0.14, 0.04);
	col *= clamp(r * 2.45, 0.0, 1.0);
	col = fract(col * 1.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
