uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.53, 0.0)) * 9.48 - t * 2.19 + ph);
    float mb = sin(length(p + vec2(0.53, 0.0)) * 13.39 - t * 2.19 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.88, 0.65) * sin(length(p) * 5.51 - time * 0.79) * 0.39;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.22), field(p, time, 2.45));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
