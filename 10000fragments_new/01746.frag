uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.17 * pow(abs(cos(ra * 4.0 + t * 0.84)), 0.68);
    v = sin((rr - pet) * 20.09 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.55), cos(time * 0.98)) * 0.20;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.18 / 3.1415927, 0.93 / r - time * 1.04);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.74 + time * 0.28);
	col *= clamp(r * 1.06, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
