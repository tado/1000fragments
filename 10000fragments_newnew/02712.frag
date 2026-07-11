uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.42 + 0.20 * pow(abs(cos(ra * 4.0 + t * 1.82)), 0.78);
    v = sin((rr - pet) * 17.88 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.77;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.79 / 3.1415927, 0.86 / r - time * 0.77);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.00 + time * 0.76);
	col *= clamp(r * 1.64, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
