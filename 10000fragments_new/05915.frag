uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.35 * pow(abs(cos(ra * 7.0 + t * 1.27)), 1.90);
    v = sin((rr - pet) * 21.15 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.29), field(p, time, 2.59));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.68, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
