uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.23 * pow(abs(cos(ra * 7.0 + t * 1.93)), 1.53);
    v = sin((rr - pet) * 15.99 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	p.y += sin(p.x * 2.94 + time * 3.07) * 0.21;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.93;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.41, 0.36, 0.28), vec3(0.96, 0.82, 1.00), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
