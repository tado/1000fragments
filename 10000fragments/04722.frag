uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 11.31 - t * 3.22 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 25.00 - t * 3.22 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.26, 1.04, 0.86) + vec3(0.01, 0.16, 0.03);
	col = fract(col * 1.61);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
