uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 2.67 * sin(t * 1.02) + t * 5.89 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.76;
	p *= 1.0 + 0.29 * sin(time * 3.61);
	p.x += sin(p.y * 7.74 + time * 1.80) * 0.12;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.77, 0.40, 0.92) * (0.11 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
