uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 5.08 * sin(t * 0.46) + t * 4.48 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.71;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.73, 0.50, 0.49) * (0.20 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.37 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
