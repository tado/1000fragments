uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 5.39 * sin(t * 0.65) + t * 1.98 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.97 + (time * 0.59) * 0.88) * 0.19;
	p += vec2(sin((time * 0.59) * 0.52), cos((time * 0.59) * 0.34)) * 0.22;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.85;
	p.y += sin(p.x * 3.70 + (time * 0.59) * 1.81) * 0.22;
	p = mix(p, p.yx, 0.5 + 0.5 * sin((time * 0.59) * 1.42));
	p = (floor(p * 19.9) + 0.5) / 19.9;
	vec3 col = vec3(field(p, (time * 0.59), 0.0), field(p, (time * 0.59), 0.11), field(p, (time * 0.59), 0.22));
	col = 0.5 + 0.5 * col;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(0.915, 0.988, 1.054) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
