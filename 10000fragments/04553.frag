uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 31.68 - t * 1.28 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 36.40 - t * 1.28 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.90), field(p, time, 1.79));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.73, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
