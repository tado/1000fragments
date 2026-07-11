uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 6.07 * sin(t * 0.50) + t * 2.79 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.80;
	{ p = vec2(atan(p.y, p.x) * 1.90, length(p) * 5.48 - time * 0.33); }
	p = (floor(p * 16.2) + 0.5) / 16.2;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.61, 0.82, 1.38) + vec3(0.29, 0.07, 0.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
