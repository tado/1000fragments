uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.33 + 0.24 * pow(abs(cos(ra * 4.0 + t * 1.62)), 0.99);
    v = sin((rr - pet) * 13.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 8.8) + 0.5) / 8.8;
	p *= 1.33;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.32), field(p, time, 0.63));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
