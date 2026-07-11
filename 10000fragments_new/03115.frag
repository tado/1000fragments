uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 2.24 * sin(t * 1.02) + t * 4.95 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.63, -0.58) * sin(length(p) * 5.93 - time * 1.15) * 0.16;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.65), field(p, time, 1.29));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
