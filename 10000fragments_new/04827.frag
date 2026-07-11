uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.57 + 0.19 * pow(abs(cos(ra * 3.0 + t * 1.15)), 2.19);
    v = sin((rr - pet) * 13.05 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.81 / 3.1415927, 0.77 / r + time * 1.82);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.15, 0.37, 0.58) * (0.24 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.77, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
