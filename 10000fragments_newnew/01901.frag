uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.53 + 0.22 * pow(abs(cos(ra * 3.0 + t * 0.57)), 0.57);
    v = sin((rr - pet) * 22.57 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.67;
	{ p = vec2(atan(p.y, p.x) * 2.28, length(p) * 3.92 - time * 0.52); }
	p *= 1.0 + 0.17 * sin(time * 3.07);
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.32));
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.00), field(p, time, 2.00));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
