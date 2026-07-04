uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 2.50 * sin(t * 0.56) + t * 5.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.91;
	p *= 1.46;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.14, 0.10, 0.44), vec3(0.99, 0.91, 0.89), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
