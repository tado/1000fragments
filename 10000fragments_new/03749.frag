uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 5.32 * sin(t * 1.35) + t * 2.51 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.97;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.56, 0.55, 0.55) * (0.13 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= 0.84 + 0.19 * sin(gl_FragCoord.y * 2.34 + time * 4.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
