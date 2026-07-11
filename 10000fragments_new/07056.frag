uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.39 + 0.31 * pow(abs(cos(ra * 6.0 + t * 1.57)), 2.14);
    v = sin((rr - pet) * 10.38 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.40;
	p = fract(p * 1.47) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.78), field(p, time, 1.56));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
