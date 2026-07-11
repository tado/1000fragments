uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 4.04 * sin(t * 0.96) + t * 3.01 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.70, 0.45, 0.75) * (0.09 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = mod(col * 1.23, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
