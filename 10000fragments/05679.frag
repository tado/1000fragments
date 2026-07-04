uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.59, 0.0)) * 23.63 - t * 3.49 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 29.43 - t * 3.88 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.96;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.25), field(p, time, 0.49));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
