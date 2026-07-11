uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 3.47 * sin(t * 0.66) + t * 4.89 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.36, 0.92, 0.82) * (0.20 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= 0.84 + 0.17 * sin(gl_FragCoord.y * 2.76 + time * 5.92);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
