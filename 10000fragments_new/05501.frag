uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 17.54 - t * 3.27 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 13.52 - t * 2.97 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.97, 0.67, 1.34) + vec3(0.15, 0.15, 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
