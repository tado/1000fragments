uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 27.13 - t * 2.63 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 20.49 - t * 2.63 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.88;
	p = abs(p);
	p += vec2(0.44, 0.44) * sin(length(p) * 5.50 - time * 1.60) * 0.37;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.54), field(p, time, 1.07));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
