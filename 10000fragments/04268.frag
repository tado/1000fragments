uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 10.05 - t * 2.50 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 39.58 - t * 2.50 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.55;
	p += vec2(0.35, 0.77) * sin(length(p) * 3.04 - time * 0.81) * 0.21;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.01), field(p, time, 2.02));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
