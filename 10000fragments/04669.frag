uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.58, 0.0)) * 36.77 - t * 5.81 + ph);
    float mb = sin(length(p + vec2(0.58, 0.0)) * 9.08 - t * 5.81 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.09, 0.09, 0.47), vec3(0.69, 0.59, 0.82), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
