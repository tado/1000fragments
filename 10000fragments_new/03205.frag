uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 4.64 * sin(t * 1.35) + t * 4.39 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.34;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.77, 0.17, 0.38) * (0.06 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col *= 0.88 + 0.18 * sin(gl_FragCoord.y * 2.90 + time * 17.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
