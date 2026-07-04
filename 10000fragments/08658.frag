uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 4.13 * sin(t * 1.20) + t * 4.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.0 + 0.40 * sin(time * 4.17);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.41, 0.07, 0.06), vec3(0.69, 0.57, 0.93), d);
	col *= 0.90 + 0.19 * sin(gl_FragCoord.y * 2.05 + time * 5.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
