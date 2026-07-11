uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.46, 0.0)) * 25.34 - t * 7.93 + ph);
    float mb = sin(length(p + vec2(0.46, 0.0)) * 32.53 - t * 7.93 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.60;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.74), field(p, time, 1.47));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.88 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
