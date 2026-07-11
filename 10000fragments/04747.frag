uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 21.73 - t * 1.27 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 15.49 - t * 1.27 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.60), field(p, time, 1.21));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
