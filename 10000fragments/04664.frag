uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.38, 0.0)) * 27.43 - t * 2.83 + ph);
    float mb = sin(length(p + vec2(0.38, 0.0)) * 20.55 - t * 2.83 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.42, 0.17, 0.01), vec3(0.79, 0.78, 0.81), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
