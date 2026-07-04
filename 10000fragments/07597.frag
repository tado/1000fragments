uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.35 + 0.21 * pow(abs(cos(ra * 7.0 + t * 2.61)), 2.63);
    v = sin((rr - pet) * 12.32 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.91;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.54), field(p, time, 1.09));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.09 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
