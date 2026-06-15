uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 37.86 - t * 6.34 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 14.31 - t * 6.34 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.94;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.48, 0.11, 0.49), vec3(1.00, 0.52, 0.87), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
