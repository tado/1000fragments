uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 14.91 - t * 7.94 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 31.94 - t * 5.82 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.81), field(p, time, 1.62));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.19 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
