uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 35.38 - t * 1.40 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 34.35 - t * 3.34 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	p *= 3.18;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.18, 0.30, 0.54), vec3(0.95, 0.54, 0.83), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
