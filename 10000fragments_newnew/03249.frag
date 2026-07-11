uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.46 + 0.24 * pow(abs(cos(ra * 7.0 + t * 2.53)), 0.93);
    v = sin((rr - pet) * 11.06 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	{ p = vec2(atan(p.y, p.x) * 2.55, length(p) * 2.51 - time * 0.29); }
	p = sin(p * 2.29 + time * 0.93) * 0.74;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.94), field(p, time, 1.88));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
